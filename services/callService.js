var FormData = require("form-data"); //not used
var request = require("request");

module.exports = class CallService {
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
};
