import { Router } from 'express';
import { carController } from '../controllers/car.controller.js';

const router = Router();


router.get("/", carController.getAll);
router.get("/:id", carController.getById);
router.post("/", carController.create);
router.put("/:id", carController.update);
router.delete("/:id", carController.delete);

export { router as carRouter }