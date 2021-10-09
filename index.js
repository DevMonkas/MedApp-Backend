require("dotenv").config();
const mongoose = require("mongoose");
const astrologers = require("./routes/astrologerRoute.js");
const users = require("./routes/userRoute.js");
const call = require("./routes/callRoute.js");
const wallet = require("./routes/walletRoute");
const express = require("express");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const port = process.env.PORT || 8000;
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Top Astrologer API",
      description: "Top Astrologer Backend API DOC",
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
app.use("/astrologers", astrologers);
app.use("/users", users);
app.use("/calling", call);
app.use("/wallet", wallet);

const swaggerJSDoc = require("swagger-jsdoc"); //No use

app.listen(port, () => {
  console.log(`Application is listening at port ${port}`);
});
