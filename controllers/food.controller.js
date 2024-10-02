const { sendRes } = require("../functions/nestedReturn");
const {
  validateAddFood: validateAdd,
  validateUpdateFood: validateUpdate,
} = require("../functions/validation");
const {
  findAllRestaurantFoods,
  findRestaurantFood,
  deleteRestaurantFood,
  updateRestaurantFood,
  createRestaurantFood,
} = require("../services/food.service");

const getAllFoods = async (req, res, next) => {
  try {
    const foods = await findAllRestaurantFoods(req.params.resId);
    if (!foods.status) return sendRes(res, false, "خطا در ارسال غذاها", null);
    else return sendRes(res, true, null, foods.data);
  } catch (error) {
    console.log(error);
    return sendRes(res, false, "خطا در ارسال غذاها", null);
  }
};

const getFood = async (req, res, next) => {
  try {
    const food = await findRestaurantFood(req.params.resId, req.params.id);
    if (!food.status) return sendRes(res, false, "خطا در ارسال غذا", null);
    else return sendRes(res, true, null, food.data);
  } catch (error) {
    console.log(error);
    return sendRes(res, false, "خطا در ارسال غذا", null);
  }
};

const deleteFood = async (req, res, next) => {
  try {
    const restaurant = await deleteRestaurantFood(
      req.params.resId,
      req.params.id
    );
    if (!restaurant.status) return sendRes(res, false, "خطا در حذف غذا", null);
    else return sendRes(res, true, null, null);
  } catch (error) {
    console.log(error);
    return sendRes(res, false, "خطا در حذف غذا", null);
  }
};

const updateFood = async (req, res, next) => {
  const { error } = validateUpdate(req.body);
  if (error) {
    console.log(error.details[0].message);
    return sendRes(res, false, "", null);
  }
  try {
    const restaurant = await updateRestaurantFood(
      req.params.resId,
      req.params.id,
      req.body
    );

    if (!restaurant.status)
      return sendRes(res, false, "خطا در ویرایش غذا", null);
    else return sendRes(res, true, null, null);
  } catch (error) {
    console.log(error);
    return sendRes(res, false, "خطا در ویرایش غذا", null);
  }
};

const addFood = async (req, res, next) => {
  const { error } = validateAdd(req.body);
  if (error) {
    console.log(error.details[0].message);
    return sendRes(res, false, "", null);
  }
  try {
    const restaurant = await createRestaurantFood(req.params.resId, req.body);

    if (!restaurant.status)
      return sendRes(res, false, "خطا در ویرایش غذا", null);
    else return sendRes(res, true, null, null);
  } catch (error) {
    console.log(error);
    return sendRes(res, false, "خطا در ویرایش غذا", null);
  }
};

module.exports = {
  getAllFoods,
  getFood,
  deleteFood,
  updateFood,
  addFood,
};
