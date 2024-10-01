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
  findUserByEmail,
  createUser,
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
    console.log(error.details[0].message);
    return sendRes(res, false, "", null);
  }
  try {
    const existingUser = await findUserByEmail(req.body.email);

    if (!existingUser.status)
      return sendRes(res, false, "این ایمیل قبلا استفاده شده است", null);

    const user = req.body;

    user.password = await hashString(user.password);

    await createUser(user);
    const token = jwt.sign(
      { email: user.email, username: user.username, isAdmin: user.isAdmin },
      JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    return sendRes(res, true, null, token);
  } catch (error) {
    console.log(error);
    return sendRes(res, false, "خطا در ثبت نام", null);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return sendRes(res, false, "ایمیل یا رمز عبور خالی است", null);

    const user = await findUserByEmail(email);
    if (!user)
      return sendRes(res, false, "کاربری با این ایمیل وجود ندارد", null);

    const hashedPassword = user.password;
    const passwordCheck = await compareString(password, hashedPassword);
    if (!passwordCheck) return sendRes(res, false, "رمز عبور اشتباه است", null);

    const token = jwt.sign(
      { email: user.email, username: user.username, isAdmin: user.isAdmin },
      JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    return sendRes(res, true, null, token);
  } catch (error) {
    console.log(error);
    return sendRes(res, false, "خطا در ورود", null);
  }
};

module.exports = {
  signup,
  login,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
};
