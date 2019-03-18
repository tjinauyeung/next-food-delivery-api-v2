import mongoose from "mongoose";

const dishSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number
});

const Dish = mongoose.model("Dish", dishSchema);

export default Dish;
