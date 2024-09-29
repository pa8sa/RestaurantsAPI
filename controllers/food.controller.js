const Restaurant = require("../models/restaurant.model");
const {
  validateAddFood: validateAdd,
  validateUpdateFood: validateUpdate,
} = require("../functions/validation");

const getAllFoods = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.resId);
    if (!restaurant) {
      return res.status(404).send("Restaurant Doesnt Found");
    }

    const foods = restaurant.foods;
    res.status(200).send(foods);
  } catch (error) {
    res.status(400).send("Invalid Id");
  }
};

const getFood = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.resId);
    if (!restaurant) {
      return res.status(404).send("Restaurant Doesnt Found");
    }

    const food = restaurant.foods[req.params.id];
    if (!food) {
      return res.status(404).send("Food Doesnt Found");
    }
    res.status(200).send(food);
  } catch (error) {
    res.status(400).send("Invalid Id");
  }
};

const deleteFood = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.resId);
    if (!restaurant) {
      return res.status(404).send("Restaurant Doesnt Found");
    }

    const food = restaurant.foods[req.params.id];
    if (!food) {
      return res.status(404).send("Food Doesnt Found");
    }
    restaurant.foods.splice(req.params.id, 1);
    await restaurant.save();
    res.status(200).send(food);
  } catch (error) {
    res.status(400).send("Invalid Id");
  }
};

const updateFood = async (req, res) => {
  const { error } = validateUpdate(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }
  try {
    const restaurant = await Restaurant.findById(req.params.resId);
    if (!restaurant) {
      return res.status(404).send("Restaurant Doesnt Found");
    }

    const food = restaurant.foods[req.params.id];
    if (!food) {
      return res.status(404).send("Food Doesnt Found");
    }

    food.set(req.body);
    await restaurant.save();
    res.status(200).send(food);
  } catch (error) {
    res.status(400).send("Invalid Id");
  }
};

const addFood = async (req, res) => {
  const { error } = validateAdd(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }
  try {
    const restaurant = await Restaurant.findById(req.params.resId);
    if (!restaurant) {
      return res.status(404).send("Restaurant Doesnt Found");
    }

    const food = req.body;

    restaurant.foods.push(food);
    await restaurant.save();
    res.status(200).send(food);
  } catch (error) {
    res.status(400).send("Invalid Id");
  }
};

module.exports = {
  getAllFoods,
  getFood,
  deleteFood,
  updateFood,
  addFood,
};
