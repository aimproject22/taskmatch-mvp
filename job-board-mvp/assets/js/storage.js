import { STORAGE_KEY, seedState } from "./data.js";

export function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(seedState);
  try {
    const parsed = JSON.parse(saved);
    return {
      ...structuredClone(seedState),
      ...parsed,
      problems: parsed.problems?.length ? parsed.problems : seedState.problems,
      users: parsed.users?.length ? parsed.users : seedState.users,
    };
  } catch {
    return structuredClone(seedState);
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function resetState() {
  const fresh = structuredClone(seedState);
  saveState(fresh);
  return fresh;
}

export function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`;
}
