import { STORAGE_KEY, seedState } from "./data.js";

export function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(seedState);
  try {
    const parsed = JSON.parse(saved);
    const state = {
      ...structuredClone(seedState),
      ...parsed,
      problems: parsed.problems?.length ? parsed.problems : seedState.problems,
      users: parsed.users?.length ? parsed.users : seedState.users,
    };
    return migrateInstitutionTerms(migrateLegacyStudent(state));
  } catch {
    return migrateInstitutionTerms(structuredClone(seedState));
  }
}

function migrateLegacyStudent(state) {
  const fresh = structuredClone(seedState);
  const legacyName = ["김", "민", "준"].join("");
  const legacyTeamName = ["SEM", " Data", " Lab"].join("");
  state.users = state.users.map((user) => (user.name === legacyName || user.id === "u-student" ? { ...user, name: "하준영" } : user));

  if (!state.profile || state.profile.name === legacyName) {
    state.profile = structuredClone(fresh.profile);
  }

  state.teams = (state.teams?.length ? state.teams : fresh.teams).map((team) => {
    if (team.leader !== legacyName && !String(team.members || "").includes(legacyName) && team.id !== "team-1") return team;
    return structuredClone(fresh.teams[0]);
  });

  state.mentorLogs = (state.mentorLogs?.length ? state.mentorLogs : fresh.mentorLogs).map((log) => ({
    ...log,
    team: String(log.team || "").replaceAll(legacyTeamName, "Materials AI Lab"),
  }));

  if (!state.applications?.length) {
    state.applications = structuredClone(fresh.applications);
  } else {
    state.applications = state.applications.map((item) => (item.teamId === "team-1" ? { ...item, status: item.status === "접수" ? "지원 완료" : item.status } : item));
  }

  return state;
}

function migrateInstitutionTerms(value) {
  const legacyFull = ["정부", "출연", "연구기관"].join("");
  const legacyShort = ["정", "출", "연"].join("");
  if (typeof value === "string") {
    return value.replaceAll(legacyFull, "연구기관").replaceAll(legacyShort, "연구기관");
  }
  if (Array.isArray(value)) return value.map(migrateInstitutionTerms);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, migrateInstitutionTerms(item)]));
  }
  return value;
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
