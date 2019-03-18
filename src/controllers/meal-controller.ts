import { Error } from "mongoose";
import Model from "../models/Meal";
import MealMapper from "../models/meal-mapper";

interface MealController {
  makeMeal: (req, res) => void;
  getMeals: (req, res) => void;
  getMeal: (req, res) => void;
  updateMeal: (req, res) => void;
  removeMeal: (req, res) => void;
}

const controller = {} as MealController;

controller.makeMeal = function(req, res) {
  Model.create(MealMapper.fromJSON(req.body))
    .then(meal => MealMapper.toJSON(meal))
    .then(meal => res.send(meal))
    .catch((error: Error) => {
      console.log(`Failed to create meal in db: ${error.message}`);
      res.status(500).send("Failed to make meal");
    });
};

controller.getMeals = (req, res) => {
  Model.find()
    .then(meals => MealMapper.mapToJSON(meals))
    .then(meals => res.send(meals))
    .catch(err => {
      console.log({ err });
      res.status(500).send("Failed to get meals");
    });
};

controller.getMeal = (req, res) => {
  const id = req.params.id;
  Model.findById(id)
    .then(meal => MealMapper.toJSON(meal))
    .then(meal => res.send(meal))
    .catch(err => {
      console.log({ err });
      res.status(500).send("Failed to delete meal");
    });
};

controller.removeMeal = (req, res) => {
  const mealId = req.params.id;
  Model.deleteOne({ _id: mealId })
    .then(() => res.send(`Deleted meal ${mealId}`))
    .catch(error => {
      console.log(`Failed to delete meal ${mealId} from db: ${error}`);
      res.status(500).send("Failed to delete meal");
    });
};

controller.updateMeal = (req, res) => {
  const id = req.params.id;
  Model.updateOne({ _id: id }, req.body)
    .then(meal => MealMapper.toJSON(meal))
    .then(meal => res.send(meal))
    .catch(err => {
      console.log({ err });
      res.status(500).send("Failed to delete meal");
    });
};

export default controller;
