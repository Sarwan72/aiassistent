import express from 'express';
import { getCurrentUser } from '../controllers/user.controller.js';
import isAuth from '../middlewares/isAuth.js';
import upload from '../middlewares/multer.js';
import { updateAssistant } from '../controllers/user.controller.js';
import { askToAssistant } from '../controllers/user.controller.js';

const userRouter=express.Router();
userRouter.get('/profile',isAuth, getCurrentUser);
userRouter.put('/update',isAuth,upload.single("assistantImage"), updateAssistant);
userRouter.post('/asktoassistant',isAuth, askToAssistant);
export default userRouter;