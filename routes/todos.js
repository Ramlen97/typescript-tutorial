"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text
    };
    todos.push(newTodo);
    res.status(201).json({ message: 'Added new todo successfully', todo: newTodo, todos: todos });
});
router.post('/delete/:todoId', (req, res) => {
    const id = req.params.todoId;
    todos = todos.filter(todo => todo.id !== id);
    res.status(200).json({ message: 'Deleted todo successfully', todos: todos });
});
router.post('/update/:todoId', (req, res) => {
    const id = req.params.todoId;
    const indx = todos.findIndex(todo => todo.id === id);
    if (indx >= 0) {
        todos[indx].text = req.body.text;
        return res.status(200).json({ message: 'Updated todo successfully', todo: todos[indx], todos: todos });
    }
    res.status(404).json({ message: 'Could not find todo for this id' });
});
exports.default = router;
