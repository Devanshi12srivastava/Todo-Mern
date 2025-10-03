import express from 'express';
import {  todoController,gettodoController, deletetodoController, updatetodoController } from '../controllers/todoController.js';
import AuthRoute from '../middleware/Authmiddleware.js';

const router=express.Router();
router.post('/create', AuthRoute, todoController);
router.post('/getAll/:userId', AuthRoute, gettodoController);
router.delete('/delete/:id', AuthRoute, deletetodoController);
router.patch('/update/:id', AuthRoute, updatetodoController);
export default router;
