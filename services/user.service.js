const { use } = require("bcrypt/promises");
const { returnService } = require("../functions/nestedReturn");
const User = require("../models/user.model");

const findAllUsers = async () => {
  try {
    const users = await User.find();
    return returnService(true, users);
  } catch (error) {
    console.log(error);
    return returnService(false, null);
  }
};

const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return returnService(true, user);
  } catch (error) {
    console.log(error);
    return returnService(false, null);
  }
};

const deleteUserById = async (userId) => {
  try {
    const user = await User.findOneAndDelete(userId);
    return returnService(true, user);
  } catch (error) {
    console.log(error);
    return returnService(false, null);
  }
};

const updateUserById = async (userId, userData) => {
  try {
    const user = await User.findByIdAndUpdate(userId, userData, { new: true });
    if (!user) return returnService(true, null);
    return returnService(true, user);
  } catch (error) {
    console.log(error);
    return returnService(false, null);
  }
};

module.exports = { findAllUsers, findUserById, deleteUserById, updateUserById };