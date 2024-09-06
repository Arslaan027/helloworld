const express = require("express");
const db = require("./db");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json()); //===> it stores the data in the req.body

app.get("/", (req, res) => {
  res.send({ msg: "Welcome to My restaurant" });
});

/* -------------------------------------------------------------------------- */
/*                                Person router                               */
/* -------------------------------------------------------------------------- */

const personRoute = require("./Routes/PersonRoute");
app.use("/person", personRoute);

/* -------------------------------------------------------------------------- */
/*                              MenuItem Routers                              */
/* -------------------------------------------------------------------------- */

const MenuItems = require("./Routes/ItemRoute");
app.use("/item", MenuItems);

/* -------------------------------------------------------------------------- */
/*                          Listening port and running                       */
/* -------------------------------------------------------------------------- */
app.listen(3000, () => {
  console.log("Listening");
});
