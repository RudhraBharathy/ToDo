const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./src/routes/routes");
const errorHandler = require("./src/middlewares/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3001;

mongoose.connect("mongodb://localhost:27017/ToDo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB Connected");
}).catch((err) => {
  console.error("MongoDB Connection Error:", err);
  process.exit(1);
});

app.use(routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server Listening on port: ${port}`);
});
