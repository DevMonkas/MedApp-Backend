var FormData = require("form-data"); //not used
var request = require("request");
const conversation = require("../models/conversation");
const doctor = require("../models/doctor");
const onlineuser = require("../models/onlineuser");
const user = require("../models/user");
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
    console.log("new=>", socket.id);
    socket.emit("connection-success", { success: socket.id });
    //   socket.join(data.roomId);
    socket.on("joinServer", (data) => {
      socket.join(data.roomId);
      console.log("--->", data);
      console.log(`${socket.id} joined ${data.roomId}`);
      onlineuser
        .create({
          phone: data.phone,
        })
        .catch((err) => {
          console.log("Already Joined");
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
     *   userPhone: string,
     *   doctorPhone: string,
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
        userPhone: data.payload.userPhone,
        doctorPhone: data.payload.doctorPhone,
      });
      try {
        if (convExists) {
          await conversation.findOneAndUpdate(
            {
              userPhone: data.payload.userPhone,
              doctorPhone: data.payload.doctorPhone,
            },
            {
              $push: {
                messages: {
                  to: data.payload.to,
                  from: data.payload.from,
                  message: data.payload.message,
                  system: data.payload.system,
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
              userPhone: data.payload.userPhone,
              doctorPhone: data.payload.doctorPhone,
              status: true,
              messages: [
                {
                  to: data.payload.to,
                  from: data.payload.from,
                  message: data.payload.message,
                  system: data.payload.system,
                },
              ],
            })
            .then((data) => {
              console.log(data);
            });
        }
        socket.to(data.roomId).emit("message", {
          ...data.payload,
          created_at: new Date().toUTCString(),
        });
      } catch (err) {
        //handle error
        console.log(err);
        socket.to(socket.id).emit("error occured", err);
      }
    });

    socket.on("offerOrAnswer", (data) => {
      socket.to(data.roomId).emit("offerOrAnswer", {
        roomId: data.roomId,
        payload: data.payload,
      });
      console.log("xoxox", data);
      console.log(`offer sent to roomId ${data.roomId}`);
    });
    socket.on("answered", (data) => {
      socket.to(data.roomId).emit("answered", data.payload);
    });
    socket.on("videoToggle", (data) => {
      socket.to(data.roomId).emit("videoToggle", data.payload);
    });
    socket.on("audioToggle", (data) => {
      socket.to(data.roomId).emit("audioToggle", data.payload);
    });
    socket.on("callEnded", (data) => {
      socket.to(data.roomId).emit("callEnded", data.payload);
    });
    socket.on("candidate", (data) => {
      socket.to(data.roomId).emit("candidate", data.payload);
    });
    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  }
  static async getChatWithDoctor(data) {
    try {
      let res = await conversation.findOne(
        {
          userPhone: data.userPhone,
          doctorPhone: data.doctorPhone,
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
          userPhone: data.phoneNumber,
        },
        { messages: 0 }
      );
      res = await Promise.all(
        res.map(async (ele, index) => {
          let doc = await doctor.findOne(
            { phone: ele.doctorPhone },
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
  static async getAllConsultationsForDoctor(data) {
    try {
      let res = await conversation.find(
        {
          doctorPhone: data.phoneNumber,
        },
        { messages: 0 }
      );
      console.log(res);
      res = await Promise.all(
        res.map(async (ele, index) => {
          let doc = await user.findOne({ phone: ele.userPhone }, { name: 1 });
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
