const { Router } = require("express");
const {getAllTasks, getTask, createTask,
deleteTask, updateTask } = require('../controllers/tasks.controller')

const pool = require('../db');

const router = Router();

router.get('/vehiculo', getAllTasks)

router.get('/vehiculo/:id', getTask)

router.post('/vehiculo', createTask)

router.delete('/vehiculo/:id',deleteTask)

router.put('/vehiculo/:id',updateTask)

module.exports = router;
