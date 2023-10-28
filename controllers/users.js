const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { hashString, compareString } = require("../functions/hash");
const {
  validateAddUser: validateAdd,
  validateUpdateUser: validateUpdate,
} = require("../functions/validation");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    console.log(error.message);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User Doesnt Found");
    }
    res.status(200).send(user);
  } catch (error) {
    console.log(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete(req.params.id);
    if (!user) {
      res.status(404).send("User Doesnt Found");
    }
    res.status(200).send(user);
  } catch (error) {
    console.log(error.message);
  }
};

const updateUser = async (req, res) => {
  const { error } = validateUpdate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      res.status(404).send("User Doesnt Found");
    }
    res.status(200).send(user);
  } catch (error) {
    console.log(error.message);
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
      return res.status(400).send("Email is already in use. Please choose a different email.");
    }

    const user = req.body;

    user.password = await hashString(user.password);

    await User.create(user);
    const token = jwt.sign(
      { email: user.email, username: user.username, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
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
      process.env.JWT_SECRET,
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

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

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
