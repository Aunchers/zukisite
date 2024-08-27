// components/ApiData.tsx
"use server";
import axios from "axios";

interface Guild {
  code: string;
  type: number;
  expires_at: string | null;
  guild: Record<string, any>; // Replace with a more specific type if known
  channel: Record<string, any>; // Replace with a more specific type if known
  inviter: Record<string, any>; // Replace with a more specific type if known
  approximate_member_count: number;
  approximate_presence_count: number;
}

export async function getGuildCount(
  guild: string,
): Promise<number | undefined> {
  try {
    const apiResult = await axios.get<Guild>(
      `https://discord.com/api/v9/invites/${guild}?with_counts=true&with_expiration=true`,
    );
    return apiResult.data.approximate_member_count;
  } catch (error) {
    console.error("Error fetching guild count:", error);
    return undefined;
  }
}

export async function getApiData() {
  return [
    {
      name: "ZukiJourney",
      users: (await getGuildCount("zukijourney")) ?? 1000,
      nsfw: "Use /unfilter, not /v1",
      openSource: true,
      owner: "Our Team",
      tier: 1,
      notes:
        "Largest & Oldest GPT-4 API still continuously around. Offers other popular AI-related Bots too.",
      models: ["GPT-4", "GPT-3.5", "DALL-E 2", "Stable Diffusion"],
      links: { moremodels: "https://zukijourney.xyzbot.net/v1/models" },
    },
    {
      name: "NagaAI",
      users: (await getGuildCount("nagaai")) ?? 1000,
      nsfw: "Forbidden",
      openSource: false,
      owner: "ZentixUA",
      tier: 1,
      notes:
        "Honorary successor to ChimeraGPT, the largest API in history (15k users).",
      models: ["GPT-4", "LLaMA 2", "Claude 2"],
    },
    {
      name: "KrakenAI",
      users: (await getGuildCount("krakenai")) ?? 1000,
      nsfw: "Allowed",
      openSource: false,
      owner: "PaniniCo",
      tier: 1,
      notes: "Small, long-term stable API. Runs on https://poe.com",
      models: ["GPT-3.5", "BERT", "T5"],
      links: { moremodels: "https://zukijourney.xyzbot.net/v1/models" },
    },
    {
      name: "FreeGPT",
      users: (await getGuildCount("freegpt")) ?? 1000,
      nsfw: "Forbidden",
      openSource: false,
      owner: "Fresed",
      tier: 1,
      notes:
        "Small API maintained by a surprisingly committed dev. Good quality.",
      models: ["GPT-3.5", "GPT-J", "BLOOM"],
      links: { moremodels: "https://zukijourney.xyzbot.net/v1/models" },
    },
    {
      name: "Shard",
      users: (await getGuildCount("shard")) ?? 1000,
      nsfw: "Only OSS-Models",
      openSource: false,
      owner: "Puzzy",
      tier: 2,
      notes:
        "Edgiest API with a controversial/questionable environment. Good service otherwise.",
      models: ["LLaMA", "GPT-Neo", "EleutherAI"],
      links: { moremodels: "https://zukijourney.xyzbot.net/v1/models" },
    },
  ];
}
