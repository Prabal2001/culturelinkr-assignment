const express = require("express");
const todoController = require("../controllers/todocontroller");

const router = express.Router();

router.get("/get-todo", todoController.getTodo);
router.post("/add-todo", todoController.addToDo);

router.put("/mark-todo/:id", todoController.markTodo);

router.put("/update-todo/:id", todoController.updateTodo);

router.delete("/delete-todo/:id", todoController.deleteTodo);

module.exports = router;
