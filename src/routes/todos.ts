import { Router } from 'express';

import { Todo } from '../models/todo';

type RequestBody = { text: string };
type RequestParams = { todoId: string };

let todos: Todo[] = [];

const router = Router();

router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
})

router.post('/todo', (req, res, next) => {
    const body=req.body as RequestBody;
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: body.text
    }
    todos.push(newTodo);
    res.status(201).json({ message: 'Added new todo successfully', todo: newTodo, todos: todos })
})

router.post('/delete/:todoId', (req, res) => {
    const params=req.params as RequestParams;
    const id = params.todoId;
    todos = todos.filter(todo => todo.id !== id);
    res.status(200).json({ message: 'Deleted todo successfully', todos: todos });
})

router.post('/update/:todoId', (req, res) => {
    const body=req.body as RequestBody;
    const params=req.params as RequestParams;
    const id = params.todoId;
    const indx = todos.findIndex(todo => todo.id === id);
    if (indx >= 0) {
        todos[indx].text = body.text;
        return res.status(200).json({ message: 'Updated todo successfully', todo: todos[indx], todos: todos });
    }
    res.status(404).json({ message: 'Could not find todo for this id' });
})

export default router;
