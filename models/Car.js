const mongoose = require("mongoose");
const carSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
  },
  products: {
    type: [],
    required: true
  },
});

const car = mongoose.model("car", carSchema);
module.exports = car;