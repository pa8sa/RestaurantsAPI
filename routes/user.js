const express = require("express");
const router = express.Router();

const {isAdmin} = require("../middlewares/admin");

const {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/users");

router.route("/").get(isAdmin, getAllUsers);
router.route("/:id").get(isAdmin, getUser).delete(isAdmin, deleteUser).patch(isAdmin, updateUser);

module.exports = router;
