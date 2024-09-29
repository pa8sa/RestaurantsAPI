const { Router } = require("express");
const { isAdmin } = require("../middlewares/admin");
const { authorization: auth } = require("../middlewares/authorization");
const {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/users");

const userRoute = () => {
  const userRoute = "/users";
  const router = Router();
  router.get(`${userRoute}/`, isAdmin, getAllUsers);
  router.get(`${userRoute}/:id`, isAdmin, getUser);
  router.delete(`${userRoute}/:id`, isAdmin, deleteUser);
  router.patch(`${userRoute}/:id`, auth, updateUser);
  return router;
};

module.exports = {
  userRoute,
};
