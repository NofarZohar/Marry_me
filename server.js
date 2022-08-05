const express = require("express");
const userManagement = require("express-user-management");
const cors = require("cors");
const mydb = require("./models/dbAdapter");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());
app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

userManagement.init(app, {
  mongoUrl: "mongodb://localhost:27017/MarryMe",
  activationRequired: false,
  jwtSecret: "yoursecrethere",
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

app.get("/listRings", (req, res) => {
  return mydb.listRings().then((result) => res.send(result));
});

app.get("/listOrders", (req, res) => {
  return mydb.listOrders().then((result) => res.send(result));
});

app.get("/getOrders", (req, res) => {
  return mydb.getOrders().then((result) => res.send(result));
});

app.post("/getUserType", (req, res) => {
  return mydb.getUserType(req.body.id).then((result) => res.send(result));
});

app.post("/completeOrder", (req, res) => {
  return mydb
    .completeOrder(req.body.id, req.body.orderId)
    .then((result) => res.send(result));
});

app.post("/setUserType", (req, res) => {
  return mydb
    .setUserType(
      req.body.requestingUser,
      req.body.targetUser,
      req.body.userType
    )
    .then((_) => res.send())
    .catch((_) => res.status(422).send());
});

app.post("/order", (req, res) => {
  return mydb
    .order(
      req.body.id,
      req.body.cart,
      req.body.name,
      req.body.address,
      req.body.payment
    )
    .then((_) => res.send())
    .catch((_) => res.status(422).send());
});

app.post("/newRing", (req, res) => {
  return mydb
    .newRing(
      req.body.requestingUser,
      req.body.name,
      req.body.price,
      req.body.imageUrl
    )
    .then((_) => res.send())
    .catch((_) => res.status(422).send());
});

app.get("/getUsers", (req, res) => {
  return mydb.getUsers().then((result) => res.send(result));
});
