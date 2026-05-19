import { Router } from "express";
import { agentsController } from "../controllers/agentsController";

const router = Router();

router.get("/", agentsController.list);
router.get("/mine", agentsController.myAgents);
router.get("/:id", agentsController.getOne);
router.post("/", agentsController.create);

export default router;
