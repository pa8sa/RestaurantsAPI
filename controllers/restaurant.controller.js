const { sendRes } = require("../functions/nestedReturn");
const {
  validateAddRestaurant: validateAdd,
  validateUpdateRestaurant: validateUpdate,
} = require("../functions/validation");
const {
  findAllRestaurants,
  findRestaurantById,
  deleteRestaurantById,
  createRestaurant,
} = require("../services/restaurant.service");

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await findAllRestaurants();
    return sendRes(res, true, null, restaurants.data);
  } catch (error) {
    console.log(error);
    return sendRes(res, false, "خطا در ارسال رستوران ها", null);
  }
};

const getRestaurant = async (req, res) => {
  try {
    const restaurant = await findRestaurantById(req.params.id);
    if (!restaurant.status)
      return sendRes(res, false, "رستوران پیدا نشد", null);
    else return sendRes(res, true, null, restaurant.data);
  } catch (error) {
    console.log(error);
    return sendRes(res, false, "خطا در ارسال رستوران", null);
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await deleteRestaurantById(req.params.id);
    if (!restaurant.status)
      return sendRes(res, false, "خطا در حذف رستوران", null);
    else return sendRes(res, true, null, null);
  } catch (error) {
    console.log(error);
    return sendRes(res, false, "خطا در ارسال رستوران", null);
  }
};

const updateRestaurant = async (req, res) => {
  const { error } = validateUpdate(req.body);
  if (error) {
    console.log(error.details[0].message);
    return sendRes(res, false, "", null);
  }
  try {
    const restaurant = await updateRestaurant(req.params.id, req.body);
    if (!restaurant.status)
      return sendRes(res, false, "خطا در ویرایش رستوران", null);
    else return sendRes(res, true, null, restaurant.data);
  } catch (error) {
    console.log(error);
    return sendRes(res, false, "خطا در ارسال رستوران", null);
  }
};

const addRestaurant = async (req, res) => {
  const { error } = validateAdd(req.body);
  if (error) {
    console.log(error.details[0].message);
    return sendRes(res, false, "", null);
  }
  try {
    const restaurant = await createRestaurant(req.body);
    return sendRes(res, true, null, restaurant.data);
  } catch (error) {
    console.log(error);
    return sendRes(res, false, "خطا در ایجاد رستوران", null);
  }
};

module.exports = {
  getAllRestaurants,
  getRestaurant,
  deleteRestaurant,
  updateRestaurant,
  addRestaurant,
};
