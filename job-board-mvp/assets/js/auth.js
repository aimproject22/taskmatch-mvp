import { uid } from "./storage.js";

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
}
