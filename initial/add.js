require("dotenv").config({ path: "../.env" });
const connectDB = require("../db/connect");
const Restaurant = require("../models/restaurant");
const data = require("./data.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await Restaurant.deleteMany();
    await Restaurant.create(data);
    console.log("Done");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
