const express = require('express');
const controller = require('../controller/todo.controller');
const authenticate = require('../middleware/authentication.middleware');
const todoRouter = express.Router();
const app = express();

// middleware - authentication
// app.use(authenticate)

//! Route 1: Fetching filterd Todo on basis of queries : GET "/fetchtodo" ;  LOGIN:Required
todoRouter.get('/fetch', authenticate ,controller.fetchTodo)

//! Route 2: Adding data in todo using : POST "/addMovie" ;  LOGIN:Required
todoRouter.post('/add', authenticate, controller.addTodo)

//! Route 3: Deleting one movie using : DELETE "/removeMovie:id" ;  LOGIN:Required
todoRouter.delete('/delete/:id', authenticate, controller.deleteTodo)

//! Route 4: update one movie using : PATCH "/updatemovie:id" ;  LOGIN:Required
todoRouter.patch('/update/:id', authenticate, controller.updateTodo )

module.exports = todoRouter;
// todoRoute.add().post().patch().delete()