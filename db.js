const mongoose = require("mongoose");

//===> Mongoose connection url;
const mongoURL = "mongodb://localhost:27017/hotels";

mongoose.connect(
  mongoURL
  //     , {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // }
);

//===> maintaining the MongoDB connection bridge
const db = mongoose.connection;

//===> Adding Event listeners
db.on("connected", () => {
  console.log("Connected to the Mongo DB");
});
db.on("error", (error) => {
  console.log(`Something went wrong ${error}`);
});
db.on("disconnected", () => {
  console.log("Disconnected");
});

module.exports = db;
