import { Router } from "express";
import { tasksController } from "../controllers/tasksController";

const router = Router();

router.post("/", tasksController.create);
router.get("/mine", tasksController.myTasks);
router.get("/:id", tasksController.getOne);

export default router;
