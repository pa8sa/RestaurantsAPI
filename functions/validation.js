const Joi = require("joi");

function validateAddRestaurant(restaurant) {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(20),
    address: Joi.string().required().min(3).max(40),
    workTime: Joi.string().required().min(3).max(25),
    number: Joi.string().length(8).regex(/^\d+$/).required(),
    delivery: Joi.boolean(),
    foods: Joi.array()
      .required()
      .items(
        Joi.object({
          name: Joi.string().required().min(2).max(20),
          type: Joi.string().valid("FastFood", "LocalFood").required(),
          calorie: Joi.number(),
          price: Joi.number().required(),
        })
      ),
  });

  return schema.validate(restaurant);
}

function validateUpdateRestaurant(restaurant) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20),
    address: Joi.string().min(3).max(40),
    workTime: Joi.string().min(3).max(25),
    number: Joi.string().length(8).regex(/^\d+$/),
    delivery: Joi.boolean(),
  }).min(1);

  return schema.validate(restaurant);
}

function validateAddFood(food) {
  const schema = Joi.object({
    name: Joi.string().required().min(2).max(20),
    type: Joi.string().valid("FastFood", "LocalFood").required(),
    calorie: Joi.number(),
    price: Joi.number().required(),
  });

  return schema.validate(food);
}

function validateUpdateFood(food) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(20),
    type: Joi.string().valid("FastFood", "LocalFood"),
    calorie: Joi.number(),
    price: Joi.number(),
  }).min(1);

  return schema.validate(food);
}

function validateAddUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(2).max(15).required(),
    password: Joi.string().min(8).max(16).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().length(11).required(),
    address: Joi.string().min(2).max(25).required(),
  });

  return schema.validate(user);
}

function validateUpdateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(2).max(15),
    password: Joi.string().min(8).max(16),
    email: Joi.string().email(),
    phoneNumber: Joi.string().length(11),
    address: Joi.string().min(2).max(25),
  }).min(1);

  return schema.validate(user);
}

module.exports = {
  validateAddRestaurant,
  validateUpdateRestaurant,
  validateAddFood,
  validateUpdateFood,
  validateAddUser,
  validateUpdateUser,
};
