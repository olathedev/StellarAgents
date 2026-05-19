import { v4 as uuid } from "uuid";
import { Agent, CreateAgentInput } from "../models/agent";
import { stellarService } from "./stellarService";

// In-memory store — swap for a real DB later
const agents = new Map<string, Agent>();

export const agentService = {
  async create(input: CreateAgentInput, ownerId: string): Promise<Agent> {
    const { publicKey } = stellarService.generateKeypair();
    const now = new Date().toISOString();

    const agent: Agent = {
      id: uuid(),
      ...input,
      walletPublicKey: publicKey,
      ownerId,
      status: "active",
      reputation: {
        totalTasks: 0,
        successRate: 1,
        avgResponseTime: 0,
        totalEarned: 0,
      },
      createdAt: now,
      updatedAt: now,
    };

    agents.set(agent.id, agent);
    return agent;
  },

  async getById(id: string): Promise<Agent | null> {
    return agents.get(id) ?? null;
  },

  async list(filters?: { category?: string; ownerId?: string }): Promise<Agent[]> {
    let results = Array.from(agents.values());

    if (filters?.category) {
      results = results.filter((a) => a.category === filters.category);
    }
    if (filters?.ownerId) {
      results = results.filter((a) => a.ownerId === filters.ownerId);
    }

    return results.sort(
      (a, b) => b.reputation.totalTasks - a.reputation.totalTasks
    );
  },

  async updateReputation(
    id: string,
    update: { success: boolean; durationMs: number; earnedUsdc: number }
  ): Promise<void> {
    const agent = agents.get(id);
    if (!agent) return;

    const r = agent.reputation;
    const total = r.totalTasks + 1;
    const successCount = r.successRate * r.totalTasks + (update.success ? 1 : 0);

    agent.reputation = {
      totalTasks: total,
      successRate: successCount / total,
      avgResponseTime:
        (r.avgResponseTime * r.totalTasks + update.durationMs / 1000) / total,
      totalEarned: r.totalEarned + update.earnedUsdc,
    };
    agent.updatedAt = new Date().toISOString();
    agents.set(id, agent);
  },
};
