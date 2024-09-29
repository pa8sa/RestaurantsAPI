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
    type: String,
    required: true,
  },
  delivery: {
    type: Boolean,
    default: false,
  },
  foods: [
    {
      _id: false,
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: {
          values: ["FastFood", "LocalFood"],
        },
        required: true,
      },
      calorie: {
        type: Number,
        default: 0,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
