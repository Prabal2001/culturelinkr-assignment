const TodoModel = require("../Models/Todo");

exports.addToDo = async (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ message: "Task is required" });
  }
  try {
    const todos = await TodoModel.create({ task });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Server error on adding", error: err });
  }
};

exports.getTodo = async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

exports.markTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      { _id: id },
      { completed: true },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

exports.updateTodo = async (req, res) => {
  const todoId = req.params.id;
  const updatedTask = req.body.task;

  try {
    if (!updatedTask) {
      return res.status(400).json({ message: "Task content is required" });
    }

    const todo = await TodoModel.findByIdAndUpdate(
      todoId,
      { task: updatedTask },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(deletedTodo);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
