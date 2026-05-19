import { z } from "zod";

export const TaskStatus = z.enum(["queued", "running", "done", "failed"]);

export const TaskSchema = z.object({
  id: z.string().uuid(),
  agentId: z.string().uuid(),
  userId: z.string(),
  prompt: z.string().min(1),
  result: z.string().nullable().default(null),
  status: TaskStatus.default("queued"),
  costUsdc: z.number().default(0),           // total USDC paid by user
  subAgentCostUsdc: z.number().default(0),   // USDC paid to sub-agents
  txHash: z.string().nullable().default(null),
  durationMs: z.number().nullable().default(null),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const CreateTaskSchema = TaskSchema.pick({
  agentId: true,
  prompt: true,
});

export type Task = z.infer<typeof TaskSchema>;
export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;
