require("dotenv").config();
const mongoose = require("mongoose");
const doctors = require("./routes/doctorRoute.js");
const users = require("./routes/userRoute.js");
const chat = require("./routes/chatRoute.js");
const wallet = require("./routes/walletRoute");
const express = require("express");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const port = process.env.PORT || 8000;
const ChatService = require("./services/chatService");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const admin = require("firebase-admin");
// io.use(async (socket, next) => {
//   const token = socket.handshake.auth.token;
//   console.log(token);
//   try {
//     const decodedToken = await admin.auth().verifyIdToken(token);
//     if (decodedToken) {
//       next();
//     }
//   } catch (err) {}
// });
io.on("connection", (socket) => ChatService.handleSocket(socket));
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "QiviHealth API",
      description: "QiviHealth Backend API DOC",
      servers: ["http://localhost:8000"],
    },
  },
  apis: ["./routes/*.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log(`DB Connection Succesful ${res}`))
  .catch((err) => console.log(`Error in DB connection ${err}`));

//register the enpoints
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/doctors", doctors);
app.use("/users", users);
app.use("/chat", chat);
app.use("/wallet", wallet);

const swaggerJSDoc = require("swagger-jsdoc"); //No use

server.listen(port, () => {
  console.log(`Application is listening at port ${port}`);
});
