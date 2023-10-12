const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  workTime: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  delivery: {
    type: Boolean,
    required: true,
  },
  // foods: {
  // },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
