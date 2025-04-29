import { Router } from 'express';

import { UserController } from '../controllers/auth.controller.js';
import { jwtAuthGuard } from '../middlewares/auth.middleware.js';

const router = Router();
const controller = new UserController();

router
    .post('/admin', controller.createAdmin)
    .post('/register', controller.registerUser)
    .post('/login', controller.loginUser)
    .post('/confirm-signIn', controller.confirmSignInUser)
    .post('/signOut', jwtAuthGuard, controller.signOutUser)
    .get('/:id', jwtAuthGuard, controller.getUserById)
    .get('/', controller.getAllUsers)
    .patch('/:id', jwtAuthGuard, controller.updateUser)
    .delete('/:id', jwtAuthGuard, controller.deleteUser);

export { router as authRouter }