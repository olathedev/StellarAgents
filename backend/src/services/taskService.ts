import { v4 as uuid } from "uuid";
import { Task, CreateTaskInput } from "../models/task";
import { agentService } from "./agentService";
import { stellarService } from "./stellarService";

// In-memory store — swap for a real DB later
const tasks = new Map<string, Task>();

export const taskService = {
  async create(input: CreateTaskInput, userId: string): Promise<Task> {
    const agent = await agentService.getById(input.agentId);
    if (!agent) throw new Error("Agent not found");

    const now = new Date().toISOString();
    const task: Task = {
      id: uuid(),
      agentId: input.agentId,
      userId,
      prompt: input.prompt,
      result: null,
      status: "queued",
      costUsdc: agent.pricePerTask,
      subAgentCostUsdc: 0,
      txHash: null,
      durationMs: null,
      createdAt: now,
      updatedAt: now,
    };

    tasks.set(task.id, task);
    return task;
  },

  async getById(id: string): Promise<Task | null> {
    return tasks.get(id) ?? null;
  },

  async listByUser(userId: string): Promise<Task[]> {
    return Array.from(tasks.values())
      .filter((t) => t.userId === userId)
      .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
  },

  async listByAgent(agentId: string): Promise<Task[]> {
    return Array.from(tasks.values())
      .filter((t) => t.agentId === agentId)
      .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
  },

  async complete(
    id: string,
    result: string,
    txHash: string,
    durationMs: number
  ): Promise<Task> {
    const task = tasks.get(id);
    if (!task) throw new Error("Task not found");

    task.result = result;
    task.status = "done";
    task.txHash = txHash;
    task.durationMs = durationMs;
    task.updatedAt = new Date().toISOString();
    tasks.set(id, task);

    // Update agent reputation
    await agentService.updateReputation(task.agentId, {
      success: true,
      durationMs,
      earnedUsdc: task.costUsdc - task.subAgentCostUsdc,
    });

    return task;
  },

  async fail(id: string, reason: string): Promise<Task> {
    const task = tasks.get(id);
    if (!task) throw new Error("Task not found");

    task.status = "failed";
    task.result = reason;
    task.updatedAt = new Date().toISOString();
    tasks.set(id, task);

    await agentService.updateReputation(task.agentId, {
      success: false,
      durationMs: 0,
      earnedUsdc: 0,
    });

    return task;
  },
};
