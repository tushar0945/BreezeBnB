const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/breezeBnB";

main()
  .then(() => {
    console.log("MongoDb Connected");
  })
  .catch((err) => {
    console.log("Error while conecting to MongoDB");
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initdb = async () => {
  await Listing.deleteMany({});
  initdata.data = initdata.data.map((obj) => ({
    ...obj,
    owner: "67826e60152ff96e97916fe7",
  }));
  await Listing.insertMany(initdata.data);
  console.log("Data was initilized ");
};

initdb();
