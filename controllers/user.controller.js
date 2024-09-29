const { sendRes } = require("../functions/nestedReturn");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { hashString, compareString } = require("../functions/hash");
const {
  validateAddUser: validateAdd,
  validateUpdateUser: validateUpdate,
} = require("../functions/validation");
const {
  findAllUsers,
  findUserById,
  deleteUserById,
  updateUserById,
} = require("../services/user.service");
const { JWT_SECRET } = require("../configs/config");

const getAllUsers = async (req, res) => {
  try {
    const users = await findAllUsers();
    if (users.status) return sendRes(res, true, null, users.data);
    else return sendRes(res, false, "خطا در ارسال کاربران", null);
  } catch (error) {
    console.log(error);
    return sendRes(res, false, "خطا در ارسال کاربران", null);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (user.status) return sendRes(res, true, null, user.data);
    else return sendRes(res, false, "خطا در ارسال کاربر", null);
  } catch (error) {
    console.log(error);
    return sendRes(res, false, "خطا در ارسال کاربر", null);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await deleteUserById(req.params.id);
    if (user.status) return sendRes(res, true, null, user.data);
    else return sendRes(res, false, "خطا در حذف کاربر", null);
  } catch (error) {
    console.log(error);
    return sendRes(res, false, "خطا در حذف کاربر", null);
  }
};

const updateUser = async (req, res) => {
  const { error } = validateUpdate(req.body);
  if (error) {
    console.log(error.details[0].message);
    return sendRes(res, false, "", null);
  }
  try {
    const user = updateUserById(req.params.id, req.body);
    if (user.status) {
      if (user.data !== null)
        return sendRes(res, false, "کاربر یافت نشد", null);
      else return sendRes(res, true, null, user.data);
    } else return sendRes(res, false, "خطا در حذف کاربر", null);
  } catch (error) {
    console.log(error.message);
    return sendRes(res, false, "خطا در حذف کاربر", null);
  }
};

const signup = async (req, res) => {
  const { error } = validateAdd(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(400)
        .send("Email is already in use. Please choose a different email.");
    }

    const user = req.body;

    user.password = await hashString(user.password);

    await User.create(user);
    const token = jwt.sign(
      { email: user.email, username: user.username, isAdmin: user.isAdmin },
      JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.status(200).send(token);
  } catch (error) {
    console.log(error);
    res.status(400).send("SomeThing Doest Work");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email And Password Are Required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User Not Found");
    }

    const hashedPassword = user.password;
    const passwordCheck = await compareString(password, hashedPassword);
    if (!passwordCheck) {
      return res.status(404).send("Password Is Not Correct");
    }

    const token = jwt.sign(
      { email: user.email, username: user.username, isAdmin: user.isAdmin },
      JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.status(200).send(token);
  } catch (error) {
    console.log(error);
    return res.status(404).send("SomeThing Doest Work");
  }
};

const dashboard = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(404).send("Wrong Header");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    res.status(200).send(decoded);
  } catch (error) {
    console.log(error);
    return res.status(404).send("SomeThing Doest Work");
  }
};

module.exports = {
  signup,
  login,
  dashboard,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
};
