import type { Resource, ResourceLevel } from "@/types";
import { resources as allResources } from "@/config/resources";

const LEVEL_ORDER: Record<ResourceLevel, number> = {
  essential: 0,
  recommended: 1,
  interesting: 2,
};

export function sortResources(items: Resource[], limit?: number): Resource[] {
  const sorted = [...items].sort((a, b) => {
    const la = a.level !== undefined ? LEVEL_ORDER[a.level] : 3;
    const lb = b.level !== undefined ? LEVEL_ORDER[b.level] : 3;
    if (la !== lb) return la - lb;
    return b.date.localeCompare(a.date);
  });
  return sorted.slice(0, limit);
}

export function getResources(limit?: number): Resource[] {
  return sortResources(allResources, limit);
}
