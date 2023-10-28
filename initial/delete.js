require("dotenv").config({ path: "../.env" });
const connectDB = require("../db/connect");
const Restaurant = require("../models/restaurant");
const User = require("../models/user");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await User.deleteMany();
    console.log("Done");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
