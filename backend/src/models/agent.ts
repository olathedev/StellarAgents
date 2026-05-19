import { z } from "zod";

export const AgentStatus = z.enum(["active", "paused", "retired"]);

export const AgentSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(80),
  category: z.string(),
  description: z.string(),
  systemPrompt: z.string(),
  model: z.string().default("claude-sonnet-4-6"),
  pricePerTask: z.number().positive(),    // in USDC
  maxSubAgentBudget: z.number().min(0),   // max USDC this agent can spend on sub-agents per task
  walletPublicKey: z.string(),
  ownerId: z.string(),
  status: AgentStatus.default("active"),
  reputation: z.object({
    totalTasks: z.number().default(0),
    successRate: z.number().min(0).max(1).default(1),
    avgResponseTime: z.number().default(0), // seconds
    totalEarned: z.number().default(0),     // USDC
  }),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const CreateAgentSchema = AgentSchema.pick({
  name: true,
  category: true,
  description: true,
  systemPrompt: true,
  model: true,
  pricePerTask: true,
  maxSubAgentBudget: true,
});

export type Agent = z.infer<typeof AgentSchema>;
export type CreateAgentInput = z.infer<typeof CreateAgentSchema>;
