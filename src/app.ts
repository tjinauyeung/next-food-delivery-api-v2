import express from "express";

const app = express();
const port = 8888;

app.get("/", (req, res) => {
  res.send({
    foo: "Healthy"
  });
});

app.listen(port, () => {
  console.log(`App started listening at port ${port}`);
});
