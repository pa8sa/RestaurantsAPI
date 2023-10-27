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
          calories: Joi.number(),
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

module.exports = { validateAddRestaurant, validateUpdateRestaurant };
