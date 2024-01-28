const express = require("express");
const router = express.Router();
const TodoController = require("../controllers/TodoController");

router.post("/addtodo", TodoController.addTodo);
router.put("/edittodo", TodoController.editTodo);
router.post("/showtodos", TodoController.showTodos);
router.post("/deletetodo", TodoController.deleteTodo);

module.exports = router;
