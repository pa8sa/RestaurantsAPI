const express = require("express");
const { PORT, MONGO_URL } = require("./configs/config");
const connectDB = require("./db/connect");
const { restaurantRoute } = require("./routes/restaurant.route");
const { userRoute } = require("./routes/user.route");
const { authRoute } = require("./routes/auth.route");

const app = express();
const port = PORT;

const initializeMiddlewares = () => {
  try {
    app.use(express.json());
  } catch (error) {
    console.log(error);
  }
};

const initializeRoutes = (routes) => {
  routes.forEach((route) => {
    app.use("/", route());
  });
};

const dbConnection = async () => {
  try {
    await connectDB(MONGO_URL);
  } catch (error) {
    console.log(error);
  }
};

const listen = async () => {
  try {
    app.listen(port, console.log(`server is running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

initializeMiddlewares();
initializeRoutes([userRoute, restaurantRoute, authRoute]);
dbConnection();
listen();
