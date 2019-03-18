import mongoose, { Document } from "mongoose";

export interface Meal extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  createdAt: Date;
}

const MealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  price: Number,
  image: String,
  createdAt: Date
});

MealSchema.pre<Meal>("save", function(next) {
  const now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

const Model = mongoose.model("Meal", MealSchema);

export default Model;
