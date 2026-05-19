import { Request, Response, NextFunction } from "express";
import { taskService } from "../services/taskService";
import { CreateTaskSchema } from "../models/task";
import { ok, created, notFound } from "../utils/response";

export const tasksController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const input = CreateTaskSchema.parse(req.body);
      // TODO: replace "demo-user" with req.user.id once auth is wired up
      const task = await taskService.create(input, "demo-user");
      created(res, task);
    } catch (err) {
      next(err);
    }
  },

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await taskService.getById(req.params.id);
      if (!task) return notFound(res, "Task");
      ok(res, task);
    } catch (err) {
      next(err);
    }
  },

  async myTasks(req: Request, res: Response, next: NextFunction) {
    try {
      // TODO: replace "demo-user" with req.user.id once auth is wired up
      const tasks = await taskService.listByUser("demo-user");
      ok(res, tasks);
    } catch (err) {
      next(err);
    }
  },
};
