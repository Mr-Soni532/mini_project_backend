const express = require('express');
const controller = require('../controller/user.controller')
const userRouter = express.Router();

//! Route 1: Create a User using: POST "/register". Doesnt require Auth
userRouter.post('/register', controller.registerUser)

//! Route 2:  Authenticate a User using : POST "/login". No login required
userRouter.post('/login', controller.loginUser)

//! Route 3:  Authenticate a User using : POST "/login". No login required
userRouter.post('/token', controller.token)

//! Route 4:  Oauth with Github using : POST "/login_github". No login required
userRouter.post('/login_github', controller.login_github)

module.exports = userRouter;
