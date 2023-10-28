const express = require("express");
const router = express.Router();

const { isAdmin } = require("../middlewares/admin");
const { authorization: auth } = require("../middlewares/authorization");

const {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/users");

router.route("/").get(isAdmin, getAllUsers);
router.route("/:id").get(isAdmin, getUser).delete(auth, deleteUser).patch(auth, updateUser);

module.exports = router;
