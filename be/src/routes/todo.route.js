const express = require('express');
const router = express.Router();
const TodoServices = require('../services/todo.service');
const TodoController = require('../controllers/todo.controller');

const Controller = new TodoController();
const Services = new TodoServices();

router.get('/', (req,res) => Controller.controlGetTodo(req,res,Services));
router.delete('/:id', (req,res) => Controller.controlDeleteTodo(req,res,Services));
router.post('/', (req,res) => Controller.controlCreateTodo(req,res,Services));


module.exports = router;