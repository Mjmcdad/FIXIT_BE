const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task_controller');

// Create a new task
router.post('/', taskController.createTask);

// Get all tasks
router.get('/', taskController.getAllTasks);

//accept task
router.put('/accept/:id', taskController.acceptTask);

// Get a task by ID
router.get('/:id', taskController.getTaskById);
//get task by worker id
router.get('/worker/:worker_id', taskController.getTasksByWorkerId);

// Update a task by ID
router.put('/:id', taskController.updateTask);

// Delete a task by ID
router.delete('/:id', taskController.deleteTask);

module.exports = router;