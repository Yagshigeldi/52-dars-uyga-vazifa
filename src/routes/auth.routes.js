import { Router } from 'express';

import { UserController } from '../controllers/auth.controller.js';

const router = Router();
const controller = new UserController();

router
    .post('/admin', controller.createAdmin)
    .post('/register', controller.registerUser)
    .post('/login', controller.loginUser)
    .get('/:id', controller.getUserById)
    .get('/', controller.getAllUsers)
    .patch('/:id', controller.updateUser)
    .delete('/:id', controller.deleteUser);

export { router as authRouter }