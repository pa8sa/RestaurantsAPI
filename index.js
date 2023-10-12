require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const homeRouter = require("./routes/home");
const restaurantRouter = require("./routes/restaurants");

const app = express();

app.use(express.json());
app.use("/", homeRouter);
app.use("/api/restaurants", restaurantRouter);

const port = process.env.PORT;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`server is running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
