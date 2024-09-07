const express = require("express");
const db = require("./db");
const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.PORT;
const passport = require("./Auth");

const app = express();

//===> it stores the data in the req.body
app.use(bodyParser.json());

//===> Entering in the hotel
app.get("/", (req, res) => {
  res.status(200).send({
    msg: `Welcome to my hotel sir, you Entered at ${new Date().toLocaleString()}`,
  });
});

//===> Authentication
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate("local", { session: false });

//===> Logger Middleware
const logger = require("./logger");
app.use(logger);

//===> Importing routes
const personRoute = require("./Routes/PersonRoute");
const MenuItems = require("./Routes/ItemRoute");

//===> Routers in Action
app.use("/person", personRoute);
app.use("/item", localAuthMiddleware, MenuItems);

//===> Listening port and running
app.listen(port, () => {
  console.log(`running on port ${port}`);
});
