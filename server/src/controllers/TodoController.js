const Todo = require("../models/Todo");

const TodoController = {
  async addTodo(req, res) {
    try {
      const { title, description, id } = req.body;
      const newTodo = new Todo({ id, title, description });
      await newTodo.save();
      res.send("Todo Added");
    } catch (error) {
      console.error("Error saving data:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  },

  async editTodo(req, res) {
    try {
      const { id, title, description } = req.body;
      const todo = await Todo.findOne({ id });
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      todo.title = title;
      todo.description = description;
      await todo.save();
      res.json({ message: "Todo updated successfully" });
    } catch (err) {
      console.error("Error updating todo:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async showTodos(req, res) {
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (err) {
      console.error("Error showing todos:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async deleteTodo(req, res) {
    try {
      const { id } = req.body;
      const todo = await Todo.findOne({ id });
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      await todo.deleteOne({ id });
      res.json({ message: "Todo deleted successfully" });
    } catch (err) {
      console.error("Error deleting todo:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = TodoController;
