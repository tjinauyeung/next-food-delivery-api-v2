import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import mealController from "./controllers/meal-controller";

const app = express();
const port = 8888;

app.use(bodyParser.json());

mongoose
  .connect(`mongodb://localhost:27017/admin`, { useNewUrlParser: true })
  .then(() => console.log(`connected to mongodb`))
  .catch(err => console.log(`connection with mongodb failed with: ${err}`));

// routes
app.post("/meals", mealController.makeMeal);
app.get("/meals", mealController.getMeals);
app.get("/meals/:id", mealController.getMeal);
app.patch("/meals/:id", mealController.updateMeal);
app.delete("/meals/:id", mealController.removeMeal);

app.listen(process.env.PORT || port, () => {
  console.log(`app started listening at port ${port}`);
});
