const Task = require("../models/task");
const user_validations = require("../validations/user_validations");

const createTask = async (req, res) => {
  try {
    const {
      title,
      country,
      city,
      address,
      description,
      price,
      review,
      rating,
      worker_id,
    } = req.body;

    const user_id = await user_validations.validate_token(req.headers.authorization);

    if (!user_id) throw new Error("Invalid token");

    const task = await Task.create({
      title,
      country,
      city,
      address,
      description,
      price,
      review,
      rating,
      worker_id,
      user_id,
    });


    res.status(201).json({
      task,
      message: "Task created successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error creating task",
      error: error.message,
    });
  }
};

// TODO
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Error fetching tasks",
      error: error.message,
    });
  }
};

// 
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) throw new Error("Task not found");
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Error fetching task",
      error: error.message,
    });
  }
};

// TODO
const updateTask = async (req, res) => {
  try {
    const [updated] = await Task.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) throw new Error("Task not found");
    const updatedTask = await Task.findByPk(req.params.id);
    res.status(200).json({
      task: updatedTask,
      message: "Task updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error updating task",
      error: error.message,
    });
  }
};

// TODO
const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) throw new Error("Task not found");
    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error deleting task",
      error: error.message,
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
