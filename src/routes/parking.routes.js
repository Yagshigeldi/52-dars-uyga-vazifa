import { Router } from 'express';
import { parkingController } from '../controllers/parking.controller.js';
import { jwtAuthGuard } from '../middlewares/auth.middleware.js';
import { adminGuard } from '../middlewares/admin.guard.js';

const router = Router();

router.get("/", parkingController.getAll);
router.get("/:id", parkingController.getById);
router.post("/", jwtAuthGuard, adminGuard, parkingController.create);
router.put("/:id", parkingController.update);
router.delete("/:id", jwtAuthGuard, adminGuard, parkingController.delete);

export { router as parkingRouter }