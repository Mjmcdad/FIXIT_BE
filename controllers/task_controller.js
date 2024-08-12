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

    const user_id = await user_validations.validate_token(req.headers.authorization)
    if (!user_id) throw new Error("Invalid token");

    // const  user_id = 1;
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

    // // Update the worker's task list
    // const worker = await Worker.findByPk(worker_id);
    // if (worker) {
    //   worker.tasks = [...worker.tasks, task.id]; // Assuming worker.tasks is an array of task IDs
    //   await worker.save();
    // }

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

const getTasksByWorkerId = async (req, res) => {
  try {
    const { worker_id } = req.params;
    const tasks = await Task.findAll({
      where: { worker_id: worker_id },
    });
    if (!tasks.length) throw new Error("No tasks found for this worker");
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Error fetching tasks for worker",
      error: error.message,
    });
  }
};

// const updateTaskStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const task = await Task.findByPk(id);

//     if (!task) throw new Error("Task not found");

//     if (task.status !== "pending") {
//       return res.status(400).json({
//         message: "Task status is not pending",
//       });
//     }

//     task.status = "in progress";
//     await task.save();

//     res.status(200).json({
//       task,
//       message: "Task status updated to in progress",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       message: "Error updating task status",
//       error: error.message,
//     });
//   }
// };

const acceptTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { price } = req.body;

    const task = await Task.findByPk(id);

    if (!task) throw new Error("Task not found");

    if (task.status !== "pending") {
      return res.status(400).json({
        message: "Task status is not pending",
      });
    }

    task.status = "in progress";
    task.price = price;
    await task.save();

    res.status(200).json({
      task,
      message: "Task accepted",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error accepting task",
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
  getTasksByWorkerId,
  acceptTask,
};