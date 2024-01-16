const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server Listening on port: ${port}`));

const url = "mongodb://localhost:27017/ToDo";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const todoSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
});

const Todo = mongoose.model("todos", todoSchema);

app.post("/addtodo", async (req, res) => {
  try {
    const { title, description, id } = req.body;

    const newTodo = new Todo({
      id,
      title,
      description,
    });

    await newTodo.save();
    res.send("Todo Added");
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

