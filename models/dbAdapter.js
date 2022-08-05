const { MongoClient, ObjectId, Timestamp } = require("mongodb");
// connection URI
const uri = "mongodb://localhost:27017/"; //Create a new MongoClient
const client = new MongoClient(uri);

async function getMongoClient() {
  await client.connect();
  return client.db("MarryMe");
}

async function listRings() {
  const db = await getMongoClient();
  let collection = db.collection("rings");
  let res = await collection.find({}).toArray();

  return res;
}

async function listOrders() {
  const db = await getMongoClient();
  let collection = db.collection("orders");
  let res = await collection.find({}).toArray();

  return res;
}

async function getUserType(userId) {
  const db = await getMongoClient();

  let collection = db.collection("users");
  let res = await collection
    .findOne({ _id: new ObjectId(userId) })
    .then((u) => u.userType ?? "user");

  return res;
}

async function setUserType(requestingUser, targetUser, userType) {
  const db = await getMongoClient();

  const requestingUserType = await getUserType(requestingUser);

  // only admin can change the user type
  if (requestingUserType === "admin") {
    let collection = db.collection("users");
    let res = await collection.updateOne(
      { _id: new ObjectId(targetUser) },
      { $set: { userType } }
    );
    return res;
  }
  throw new Error("Requesting user is not an admin");
}

async function newRing(requestingUser, name, price, imageUrl) {
  const db = await getMongoClient();

  const requestingUserType = await getUserType(requestingUser);

  // only admin can create a ring
  if (requestingUserType === "admin") {
    let collection = db.collection("rings");
    let res = await collection.insertOne({ name, price, imageUrl });
    return res;
  }
  throw new Error("Requesting user is not an admin");
}

async function getUsers() {
  const db = await getMongoClient();

  let collection = db.collection("users");
  let res = await collection.find({}).toArray();

  return res;
}

async function order(userId, cart, name, address, payment) {
  const db = await getMongoClient();

  // Check if the user exists
  let userCollection = db.collection("users");
  let res = await userCollection.findOne({ _id: new ObjectId(userId) });
  if (!res) {
    throw new Error("No user with that id");
  }

  // save to the db
  let ordersCollection = db.collection("orders");
  res = await ordersCollection.insertOne({
    userId,
    cart,
    name,
    address,
    payment,
    complete: false,
    orderTime: new Date(),
    completeTime: new Date(),
  });

  return res;
}

async function completeOrder(userId, orderId) {
  const db = await getMongoClient();

  // Check if the user is an admin
  const requestingUserType = await getUserType(userId);

  if (requestingUserType === "admin") {
    let collection = db.collection("orders");
    let res = await collection.updateOne(
      { _id: new ObjectId(orderId) },
      {
        $set: {
          complete: true,
          completeTime: new Date(),
        },
      }
    );
    return res;
  }
  throw new Error("Requesting user is not an admin");
}

exports.listRings = listRings;
exports.listOrders = listOrders;
exports.getUserType = getUserType;
exports.setUserType = setUserType;
exports.newRing = newRing;
exports.getUsers = getUsers;
exports.order = order;
exports.completeOrder = completeOrder;
