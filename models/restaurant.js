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
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
