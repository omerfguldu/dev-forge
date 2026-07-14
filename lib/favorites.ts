import type { Tool } from "./tools";

export type ToolUsage = Record<string, number>;

export function incrementUsage(usage: ToolUsage, href: string): ToolUsage {
  return { ...usage, [href]: (usage[href] ?? 0) + 1 };
}

export function topFavorites(
  usage: ToolUsage,
  tools: Tool[],
  limit: number = 3,
): Tool[] {
  return Object.entries(usage)
    .filter(([, count]) => count > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([href]) => tools.find((tool) => tool.href === href))
    .filter((tool): tool is Tool => tool !== undefined);
}
