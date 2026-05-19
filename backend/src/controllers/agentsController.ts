import { Request, Response, NextFunction } from "express";
import { agentService } from "../services/agentService";
import { CreateAgentSchema } from "../models/agent";
import { ok, created, notFound, serverError } from "../utils/response";

export const agentsController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { category } = req.query as { category?: string };
      const agents = await agentService.list({ category });
      ok(res, agents);
    } catch (err) {
      next(err);
    }
  },

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const agent = await agentService.getById(req.params.id);
      if (!agent) return notFound(res, "Agent");
      ok(res, agent);
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const input = CreateAgentSchema.parse(req.body);
      // TODO: replace "demo-user" with req.user.id once auth is wired up
      const agent = await agentService.create(input, "demo-user");
      created(res, agent);
    } catch (err) {
      next(err);
    }
  },

  async myAgents(req: Request, res: Response, next: NextFunction) {
    try {
      // TODO: replace "demo-user" with req.user.id once auth is wired up
      const agents = await agentService.list({ ownerId: "demo-user" });
      ok(res, agents);
    } catch (err) {
      next(err);
    }
  },
};
