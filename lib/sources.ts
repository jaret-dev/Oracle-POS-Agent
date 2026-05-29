/**
 * Human-readable labels for the memory_source codes. Used both in the agent's
 * citation instructions (server) and the chat UI's sources list (client), so
 * it lives in its own dependency-free module.
 */
export const SOURCE_LABELS: Record<string, string> = {
  sipou: "POS Guide",
  simmu: "Manager Guide",
  rause: "Reporting & Analytics",
  skill: "Learned Skill",
  store: "Store Note",
  user: "User Note",
};

export function sourceLabel(code: string): string {
  return SOURCE_LABELS[code] ?? code;
}
