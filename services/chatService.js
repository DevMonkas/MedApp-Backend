var FormData = require("form-data"); //not used
var request = require("request");
const conversation = require("../models/conversation");
const doctor = require("../models/doctor");
const onlineuser = require("../models/onlineuser");

module.exports = class ChatService {
  static async callDoctor(data) {
    const body = {
      From: data.phone.from,
      To: data.phone.to,
      CallerId: "095-138-86363",
    };
    request.post(
      {
        url:
          "https://" +
          process.env.EXOTEL_API_KEY +
          ":" +
          process.env.EXOTEL_API_TOKEN +
          "@api.exotel.com/v1/Accounts/" +
          process.env.EXOTEL_SID +
          "/Calls/connect.json",
        form: body,
      },
      function (err, response, body) {
        if (!err && response.statusCode == 200) {
          console.log(body);
        }
      }
    );
  }
  static handleSocket(socket) {
    console.log(socket.id);
    socket.emit("connection-success", { success: socket.id });
    //   socket.join(data.roomId);
    socket.on("joinServer", (data) => {
      socket.join(data.roomId);
      console.log(io.sockets.adapter.rooms.get(data.roomId));
      console.log("--->", data);
      console.log(`${socket.id} joined ${data.roomId}`);

      onlineuser
        .create({
          phone: data.phone,
        })
        .catch((err) => {
          console.error(err);
        });
    });
    socket.on("leaveServer", (data) => {
      onlineuser
        .findOneAndRemove({
          phone: data.roomId,
        })
        .then((data) => {});
      socket.leave(data.roomId);
    });
    /**
     * payload:{
     *   userId: string,
     *   doctorId: string,
     *   to: string,
     *   from: string
     *   message: string,
     *
     * }
     *
     */
    socket.on("message", async (data) => {
      console.log(data);
      const convExists = await conversation.exists({
        userId: data.payload.userId,
        doctorId: data.payload.doctorId,
      });
      console.log(convExists);
      try {
        if (convExists) {
          await conversation.findOneAndUpdate(
            {
              userId: data.payload.userId,
              doctorId: data.payload.doctorId,
            },
            {
              $push: {
                messages: {
                  to: data.payload.to,
                  from: data.payload.from,
                  message: data.payload.message,
                },
              },
            },
            {
              upsert: true,
            }
          );
        } else {
          await conversation
            .create({
              userId: data.payload.userId,
              doctorId: data.payload.doctorId,
              status: true,
              messages: [
                {
                  to: data.payload.to,
                  from: data.payload.from,
                  message: data.payload.message,
                },
              ],
            })
            .then((data) => {
              console.log(data);
            });
        }
        socket.to(data.payload.doctorId).emit("message", data.payload);
      } catch (err) {
        //handle error
        console.log(err);
        socket.to(socket.id).emit("error occured", err);
      }
    });
    socket.on("disconnect", () => {
      console.log("disconnected");
    });
    socket.on("offerOrAnswer", (data) => {
      // for (const [socketID, socket] of connectedPeers.entries()) {
      //   //don't send to self
      //   if (socketID !== data.socketID) {
      //     console.log(socketID, data.payload.type);
      //     socket.emit("offerOrAnswer", data.payload);
      //   }
      // }
      socket.to(data.payload.roomId).emit("offerOrAnswer", data.payload);
      // console.log('xoxox',data);
      console.log(`offer sent to roomId ${data.payload.roomId}`);
    });
    socket.on("candidate", (data) => {
      // for (const [socketID, socket] of connectedPeers.entries()) {
      //   //don't send to self
      //   if (socketID !== data.socketID) {
      //     console.log(socketID, data.payload.type);
      //     socket.to('qwerty').emit("candidate", data.payload);
      //   }
      // }
      console.log("candidate-->", data.roomId);
      socket.to(data.payload.roomId).emit("candidate", data.payload);
    });
  }
  static async getChatWithDoctor(data) {
    try {
      let res = await conversation.findOne(
        {
          userId: data.userId,
          doctorId: data.doctorId,
        },
        { messages: 1, _id: 0 }
      );
      if (res.messages) return res.messages;
      return [];
    } catch (err) {
      throw err;
    }
  }
  static async getAllConsultations(data) {
    try {
      let res = await conversation.find(
        {
          userId: data.phoneNumber,
        },
        { messages: 0 }
      );
      res = await Promise.all(
        res.map(async (ele, index) => {
          let doc = await doctor.findOne(
            { phone: ele.doctorId },
            { name: 1, image: 1 }
          );
          ele = JSON.parse(JSON.stringify(ele));
          Object.assign(ele, JSON.parse(JSON.stringify(doc)));
          return ele;
        })
      );
      return res;
    } catch (err) {
      throw err;
    }
  }
};
