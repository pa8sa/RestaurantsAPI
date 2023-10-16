require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const homeRouter = require("./routes/home");
const restaurantRouter = require("./routes/restaurant");
const userRouter = require("./routes/user");

const app = express();

app.use(express.json());
app.use("/", homeRouter);
app.use("/api/restaurants", restaurantRouter);
app.use("/users", userRouter);

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
