import { uid } from "./storage.js";

export const DEMO_AUTH_KEY = "taskmatch_auth";

const demoCredentials = {
  student: { username: "student", password: "student", target: "student.html", label: "학생" },
  enterprise: { username: "enterprise", password: "enterprise", target: "company.html", label: "기업" },
  admin: { username: "admin", password: "admin", target: "admin.html", label: "관리자" },
};

// Demo authentication only. Replace with real backend authentication later.
export function demoLogin(role, username, password) {
  const credential = demoCredentials[role];
  if (!credential || credential.username !== username || credential.password !== password) {
    return { ok: false, message: "아이디 또는 비밀번호가 올바르지 않습니다." };
  }
  const auth = {
    isLoggedIn: true,
    role,
    username,
    loginAt: new Date().toISOString(),
  };
  localStorage.setItem(DEMO_AUTH_KEY, JSON.stringify(auth));
  return { ok: true, auth, target: credential.target };
}

export function getDemoAuth() {
  try {
    const parsed = JSON.parse(localStorage.getItem(DEMO_AUTH_KEY) || "null");
    return parsed?.isLoggedIn ? parsed : null;
  } catch {
    return null;
  }
}

export function clearDemoAuth() {
  localStorage.removeItem(DEMO_AUTH_KEY);
}

export function demoCredentialForRole(role) {
  return demoCredentials[role] || demoCredentials.student;
}

export function currentUser(state) {
  return state.session ? state.users.find((user) => user.id === state.session.userId) || null : null;
}

export function login(state, email, password) {
  const user = state.users.find((item) => item.email === email && item.password === password);
  if (!user) return { ok: false, message: "이메일 또는 비밀번호가 맞지 않습니다." };
  state.session = { userId: user.id, role: user.role, name: user.name };
  return { ok: true, user };
}

export function signup(state, payload) {
  if (state.users.some((item) => item.email === payload.email)) {
    return { ok: false, message: "이미 등록된 이메일입니다." };
  }
  const user = { id: uid("user"), ...payload };
  state.users.push(user);
  state.session = { userId: user.id, role: user.role, name: user.name };
  return { ok: true, user };
}

export function logout(state) {
  state.session = null;
  clearDemoAuth();
}
