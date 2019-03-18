import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Dish from "./models/Dish";

const app = express();
const port = 8888;

app.use(bodyParser());

mongoose
  .connect(`mongodb://localhost:27017/admin`)
  .then(() => {
    console.log(`connected to mongodb`);
  })
  .catch(err => {
    console.log(`connection with mongodb failed with: ${err}`);
  });

app.post("/dishes", (req, res) => {
  const dish = req.body;
  Dish.create({
    name: dish.name,
    description: dish.description,
    price: dish.price
  }).then((dish: any) => {
    return res.status(200).send({
      meta: {
        message: `Succesfully created dish ${dish.id}`
      },
      data: {
        id: dish._id,
        name: dish.name,
        description: dish.description,
        price: dish.price
      }
    });
  });
});

app.get("/dishes", (req, res) => {
  Dish.find().then(dishes => {
    res.send(
      dishes.map((dish: any) => ({
        id: dish.id,
        name: dish.name,
        description: dish.description,
        price: dish.price
      }))
    );
  });
});

app.get("/dishes/:id", (req, res) => {
  const id = req.params.id;
  Dish.findById(id).then((dish: any) => {
    res.send({
      id: dish.id,
      name: dish.name,
      description: dish.description,
      price: dish.price
    });
  });
});

app.delete("/dishes/:id", (req, res) => {
  const id = req.params.id;
  Dish.deleteOne({ _id: id })
    .then((dish: any) => {
      res.send(`Deleted dish ${id} successfully.`);
    })
    .catch(e => {
      console.log(`Failed to delete dish ${id} from db with reason: ${e}`);
      res.status(500).send("Failed to delete dish");
    });
});

app.listen(process.env.PORT || port, () => {
  console.log(`app started listening at port ${port}`);
});
