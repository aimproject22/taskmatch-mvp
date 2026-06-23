import { fields, modules, routes } from "./data.js";
import { currentUser, login, logout, signup } from "./auth.js";
import { calculateFit, scoreProblemList } from "./match.js";
import { defaultRouteForRole, topRouteForRoute } from "./role-router.js";
import { loadState, resetState, saveState, uid } from "./storage.js";

let state = loadState();
let modalProblemId = null;
let toastTimer = null;

const shell = document.querySelector("#shell");

const studentPortalMenu = [
  ["dashboard", "학생 대시보드"],
  ["problems", "실전문제 찾기"],
  ["profile", "역량 프로필"],
  ["team", "팀 만들기"],
  ["applications", "내 지원 현황"],
  ["recommendations", "추천 과제"],
  ["education", "특화교육"],
  ["internship", "인턴십"],
  ["outcomes", "내 성과물"],
];

const companyPortalMenu = [
  ["dashboard", "기업 대시보드"],
  ["register", "원본문제 등록"],
  ["raw-status", "등록한 문제 현황"],
  ["applicants", "지원 학생팀"],
  ["recommendations", "추천 인재/팀"],
  ["mentor", "멘토 등록"],
  ["internship", "인턴십 연계"],
  ["mou", "MOU/NDA 관리"],
];

const adminPortalMenu = [
  ["dashboard", "관리자 대시보드"],
  ["raw-review", "원본문제 검토"],
  ["convert", "실전문제 카드 전환"],
  ["students", "학생/팀 관리"],
  ["companies", "기업 관리"],
  ["mentors", "멘토 관리"],
  ["matching", "지원/매칭 관리"],
  ["education", "특화교육 관리"],
  ["internship", "인턴십 관리"],
  ["kpi", "성과·KPI 관리"],
  ["archive", "데이터 아카이브"],
];

function esc(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function toList(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  return String(value || "")
    .split(/[,/\n|]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function route() {
  return location.hash.replace("#", "") || "home";
}

function go(id) {
  location.hash = id;
}

function persist(message) {
  saveState(state);
  if (message) showToast(message);
  render();
}

function showToast(message) {
  clearTimeout(toastTimer);
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toastTimer = setTimeout(() => toast.remove(), 2600);
}

function currentProfile() {
  return state.profile;
}

function problemById(id) {
  return state.problems.find((problem) => problem.id === id) || state.problems[0];
}

function teamById(id) {
  return state.teams.find((team) => team.id === id) || state.teams[0];
}

function chip(items, tone = "") {
  return toList(items)
    .map((item) => `<span class="tag ${tone}">${esc(item)}</span>`)
    .join("");
}

function header() {
  const user = currentUser(state);
  const activeTopRoute = topRouteForRoute(route().split(":")[0]);
  return `
    <header class="site-header">
      <button class="brand" type="button" data-route="home" aria-label="과제 JOB 홈으로 이동">
        <img class="brand-logo" src="assets/img/logo.png" alt="과제 JOB" onerror="this.outerHTML='<span class=&quot;brand-fallback&quot;>과제 JOB</span>'" />
      </button>
      <nav class="nav" aria-label="주요 메뉴">
        ${routes
          .map(
            (item) => `
              <button type="button" class="${activeTopRoute === item.id ? "active" : ""}" data-route="${item.id}">
                ${esc(item.label)}
              </button>
            `,
          )
          .join("")}
      </nav>
      <div class="auth-actions">
        ${
          user
            ? `<button class="secondary" type="button" data-route="mypage">마이페이지</button><button class="primary" type="button" data-action="logout">로그아웃</button>`
            : `<button class="secondary" type="button" data-route="login">로그인</button><button class="primary" type="button" data-route="signup">회원가입</button>`
        }
      </div>
    </header>
  `;
}

function render() {
  const [name, param] = route().split(":");
  const page = {
    home: renderHome,
    "student-portal": renderStudentPortal,
    "company-portal": renderCompanyPortal,
    "admin-portal": renderAdminPortal,
    about: renderAbout,
    problems: renderProblems,
    profile: renderProfile,
    team: renderTeam,
    company: renderCompany,
    mentor: renderMentor,
    education: renderEducation,
    internship: renderInternship,
    kpi: renderKpi,
    admin: renderAdmin,
    login: renderLogin,
    signup: renderSignup,
    mypage: renderMypage,
  }[name];

  shell.innerHTML = `${header()}${page ? page(param) : renderHome()}${modalProblemId ? renderProblemModal(problemById(modalProblemId)) : ""}`;
  window.scrollTo(0, 0);
}

function renderHome() {
  const stats = [
    ["실전문제", "40건"],
    ["참여 연구팀", "40팀"],
    ["참여 학생", "200명"],
    ["산업체·정출연", "연계"],
    ["4대 특화 분야", "운영"],
    ["팀당 연구비", "10,000천원"],
  ];
  return `
    <main>
      <section class="hero">
        <div class="hero-inner">
          <div>
            <p class="eyebrow">SOLVE-X · 산업체 실전문제 공모·매칭 플랫폼</p>
            <h1>산업체 실전문제를 학부생 연구팀과 연결하는 차세대 공학자 양성 플랫폼</h1>
            <p>
              기업은 현장의 기술문제를 등록하고, 학생은 전공과 역량에 맞는 실전문제에 참여합니다.
              사업단은 과제 재구성, 팀 매칭, 멘토링, 성과관리를 통합 지원합니다.
            </p>
            <div class="button-row" style="margin-top: 26px">
              <button class="primary" type="button" data-route="student-portal">학생으로 시작하기</button>
              <button class="secondary" type="button" data-route="company-portal">기업으로 시작하기</button>
              <button class="secondary" type="button" data-route="admin-portal">관리자 페이지</button>
            </div>
          </div>
          <aside class="hero-panel">
            <div class="flow-row"><strong>01 원본문제 접수</strong><span>산업체 기술 애로를 사업단이 접수합니다.</span></div>
            <div class="flow-row"><strong>02 사업단 재구성</strong><span>학부생 수행 가능한 실전문제 카드로 전환합니다.</span></div>
            <div class="flow-row"><strong>03 팀 매칭·멘토링</strong><span>AI 적합도와 멘토링으로 수행 가능성을 높입니다.</span></div>
            <div class="flow-row"><strong>04 성과·인턴십 연계</strong><span>결과물, 발표, 지재권, 인턴십으로 확장합니다.</span></div>
          </aside>
        </div>
      </section>

      <section class="section">
        <div class="heading">
          <div>
            <p class="eyebrow" style="color: var(--teal-dark)">ROLE PORTALS</p>
            <h2>역할별 포털 선택</h2>
          </div>
          <p>처음 접속한 사용자가 자신의 역할을 고르면 필요한 기능만 모아진 대시보드로 이동합니다.</p>
        </div>
        <div class="role-grid">
          ${roleCard("학생", "전공과 기술스택을 등록하고, 나에게 맞는 산업체 실전문제를 추천받아 팀으로 참여합니다.", "student-portal", "학생 포털로 이동")}
          ${roleCard("기업", "현장의 기술문제를 등록하고, 적합한 학생 연구팀과 멘토링·인턴십으로 연결합니다.", "company-portal", "기업 포털로 이동")}
          ${roleCard("사업단 관리자", "원본문제 검토, 과제 재구성, 팀 매칭, 멘토링, 성과 KPI를 통합 관리합니다.", "admin-portal", "관리자 포털로 이동")}
        </div>
      </section>

      <section class="section">
        <div class="stat-grid">
          ${stats.map(([label, value]) => `<div class="stat"><strong>${value}</strong><span>${label}</span></div>`).join("")}
        </div>
        <p class="support-line">실전문제 40건 · 참여 연구팀 40팀 · 참여 학생 200명 · 팀당 연구비 10,000천원</p>
      </section>

      <section class="section">
        <div class="heading">
          <div>
            <p class="eyebrow" style="color: var(--teal-dark)">SPECIALIZED FIELDS</p>
            <h2>4대 특화 분야</h2>
          </div>
          <p>산업체 수요와 지역 특화 역량을 중심으로 실전문제를 발굴합니다.</p>
        </div>
        <div class="two-col">
          ${fields
            .map(
              (field) => `
                <article class="card">
                  <span class="tag orange">특화 분야</span>
                  <h3 style="margin-top: 12px">${esc(field)}</h3>
                  <p>실전문제 발굴, 팀 매칭, 멘토링, 특화교육, 인턴십까지 연계되는 집중 분야입니다.</p>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>

      <section class="section">
        <div class="heading">
          <div>
            <p class="eyebrow" style="color: var(--teal-dark)">RECOMMENDED PROBLEMS</p>
            <h2>추천 실전문제</h2>
          </div>
          <button class="secondary" type="button" data-route="student-portal:problems">전체 보기</button>
        </div>
        <div class="grid">
          ${scoreProblemList(currentProfile(), state.problems)
            .slice(0, 3)
            .map(({ problem, fit }) => problemCard(problem, fit))
            .join("")}
        </div>
      </section>
    </main>
  `;
}

function roleCard(title, description, routeId, buttonLabel) {
  return `
    <article class="role-card">
      <span class="tag orange">${esc(title)}</span>
      <h3>${esc(title)}</h3>
      <p>${esc(description)}</p>
      <button class="primary" type="button" data-route="${routeId}">${esc(buttonLabel)}</button>
    </article>
  `;
}

function unwrapPage(html) {
  return html.trim().replace(/^<main class="page">\s*/, "").replace(/\s*<\/main>$/, "");
}

function portalRoute(baseRoute, section) {
  return section === "dashboard" ? baseRoute : `${baseRoute}:${section}`;
}

function portalShell({ eyebrow, title, description, baseRoute, menu, section, actions = "", content }) {
  return `
    <main class="page portal-page">
      <div class="portal-hero">
        <div>
          <p class="eyebrow">${esc(eyebrow)}</p>
          <h1>${esc(title)}</h1>
          <p>${esc(description)}</p>
        </div>
        <div class="button-row">${actions}</div>
      </div>
      <div class="portal-layout">
        <aside class="portal-menu" aria-label="${esc(title)} 내부 메뉴">
          ${menu
            .map(([key, label]) => `<button type="button" class="${section === key ? "active" : ""}" data-route="${portalRoute(baseRoute, key)}">${esc(label)}</button>`)
            .join("")}
        </aside>
        <section class="portal-content">${content}</section>
      </div>
    </main>
  `;
}

function metricCards(items) {
  return `<div class="stat-grid portal-stat-grid">${items.map(([label, value]) => `<div class="stat"><strong>${esc(value)}</strong><span>${esc(label)}</span></div>`).join("")}</div>`;
}

function profileCompletion() {
  const p = currentProfile();
  const fieldsToCheck = [p.name, p.university, p.department, p.year, p.email, p.interests?.length, p.skills?.length, p.equipment?.length, p.projects, p.portfolio];
  return Math.round((fieldsToCheck.filter(Boolean).length / fieldsToCheck.length) * 100);
}

function renderStudentPortal(section = "dashboard") {
  const activeSection = section || "dashboard";
  const content = {
    dashboard: renderStudentDashboard,
    problems: () => unwrapPage(renderProblems()),
    profile: () => unwrapPage(renderProfile()),
    team: () => unwrapPage(renderTeam()),
    applications: renderStudentApplications,
    recommendations: renderStudentRecommendations,
    education: () => unwrapPage(renderEducation()),
    internship: () => unwrapPage(renderInternship()),
    outcomes: renderStudentOutcomes,
  }[activeSection] || renderStudentDashboard;

  return portalShell({
    eyebrow: "STUDENT PORTAL",
    title: "학생 포털",
    description: "역량 프로필, 실전문제 추천, 팀 지원, 교육과 인턴십까지 학생에게 필요한 흐름만 모았습니다.",
    baseRoute: "student-portal",
    menu: studentPortalMenu,
    section: activeSection,
    actions: `
      <button class="primary" type="button" data-route="student-portal:profile">역량 프로필 등록</button>
      <button class="secondary" type="button" data-route="student-portal:problems">실전문제 찾기</button>
      <button class="secondary" type="button" data-route="student-portal:team">팀 생성하기</button>
      <button class="secondary" type="button" data-route="student-portal:applications">내 지원 현황 보기</button>
    `,
    content: content(),
  });
}

function renderStudentDashboard() {
  const recommended = scoreProblemList(currentProfile(), state.problems);
  return `
    <div class="heading compact-heading">
      <div><h2>학생 대시보드</h2><p>프로필 완성도와 추천 과제, 지원 현황을 한 화면에서 확인합니다.</p></div>
    </div>
    ${metricCards([
      ["내 역량 프로필 완성도", `${profileCompletion()}%`],
      ["AI 추천 실전문제", `${recommended.length}건`],
      ["지원한 과제", `${state.applications.length}건`],
      ["참여 중인 팀", `${state.teams.length}팀`],
      ["신청한 특화교육", `${state.courseApplications.length}건`],
      ["추천 인턴십", "8곳"],
    ])}
    <section class="panel portal-panel">
      <h2>오늘의 추천 과제</h2>
      <div class="grid">${recommended.slice(0, 2).map(({ problem, fit }) => problemCard(problem, fit)).join("")}</div>
    </section>
  `;
}

function renderStudentApplications() {
  return `
    <div class="heading compact-heading"><div><h2>내 지원 현황</h2><p>팀 단위 지원 내역과 상태값을 확인합니다.</p></div></div>
    ${applicationTable()}
  `;
}

function renderStudentRecommendations() {
  return `
    <div class="heading compact-heading"><div><h2>추천 과제</h2><p>역량 프로필 기반 AI 적합도 순으로 정렬된 실전문제입니다.</p></div></div>
    <div class="grid">${scoreProblemList(currentProfile(), state.problems).map(({ problem, fit }) => problemCard(problem, fit)).join("")}</div>
  `;
}

function renderStudentOutcomes() {
  return `
    <div class="heading compact-heading"><div><h2>내 성과물</h2><p>실전문제 수행 결과를 포트폴리오, 발표, 인턴십 연계로 축적하는 화면입니다.</p></div></div>
    <div class="three-col">
      <article class="card"><span class="tag orange">포트폴리오</span><h3>프로젝트 리포트</h3><p>${esc(state.profile.projects)}</p></article>
      <article class="card"><span class="tag blue">성과</span><h3>분석 데이터셋</h3><p>팀 과제 수행 결과물, 시연 자료, 발표 자료를 아카이브합니다.</p></article>
      <article class="card"><span class="tag">연계</span><h3>취업·인턴십 연결</h3><p>산업체 피드백과 멘토 평가를 기반으로 인턴십 후보로 연결합니다.</p></article>
    </div>
  `;
}

function renderCompanyPortal(section = "dashboard") {
  const activeSection = section || "dashboard";
  const content = {
    dashboard: renderCompanyDashboard,
    register: () => unwrapPage(renderCompany()),
    "raw-status": renderCompanyRawStatus,
    applicants: renderCompanyApplicants,
    recommendations: renderCompanyRecommendations,
    mentor: () => unwrapPage(renderMentor()),
    internship: renderCompanyInternship,
    mou: renderMouNda,
  }[activeSection] || renderCompanyDashboard;

  return portalShell({
    eyebrow: "COMPANY PORTAL",
    title: "기업 포털",
    description: "원본문제 등록, 지원팀 확인, 멘토링과 인턴십 연계까지 산업체 담당자에게 필요한 기능을 모았습니다.",
    baseRoute: "company-portal",
    menu: companyPortalMenu,
    section: activeSection,
    actions: `
      <button class="primary" type="button" data-route="company-portal:register">산업체 원본문제 등록</button>
      <button class="secondary" type="button" data-route="company-portal:applicants">지원 팀 확인</button>
      <button class="secondary" type="button" data-route="company-portal:mentor">멘토 등록</button>
      <button class="secondary" type="button" data-route="company-portal:internship">인턴십 연계 신청</button>
    `,
    content: content(),
  });
}

function renderCompanyDashboard() {
  const reviewing = state.rawProblems.filter((item) => ["접수", "검토 중", "재구성 필요"].includes(item.status)).length;
  return `
    <div class="heading compact-heading"><div><h2>기업 대시보드</h2><p>등록한 문제와 지원 학생팀, 멘토링 예정 흐름을 확인합니다.</p></div></div>
    ${metricCards([
      ["등록한 원본문제", `${state.rawProblems.length}건`],
      ["검토 중인 문제", `${reviewing}건`],
      ["공모 등록된 실전문제", `${state.problems.length}건`],
      ["지원 학생팀", `${state.applications.length}팀`],
      ["추천 학생팀", `${state.teams.length}팀`],
      ["멘토링 예정", `${state.mentorLogs.length}건`],
    ])}
    <section class="panel portal-panel"><h2>추천 학생팀</h2><div class="three-col">${state.teams.map(teamSummaryCard).join("")}</div></section>
  `;
}

function renderCompanyRawStatus() {
  return `<div class="heading compact-heading"><div><h2>등록한 문제 현황</h2><p>산업체가 등록한 원본문제의 검토 상태를 확인합니다.</p></div></div>${rawProblemTable(state.rawProblems)}`;
}

function renderCompanyApplicants() {
  return `<div class="heading compact-heading"><div><h2>지원 학생팀</h2><p>실전문제에 지원한 학생 연구팀 목록입니다.</p></div></div>${applicationTable()}`;
}

function renderCompanyRecommendations() {
  return `
    <div class="heading compact-heading"><div><h2>추천 인재/팀</h2><p>기술스택과 전공 구성을 기준으로 추천되는 학생 연구팀입니다.</p></div></div>
    <div class="three-col">${state.teams.map(teamSummaryCard).join("")}</div>
  `;
}

function renderCompanyInternship() {
  return `
    <div class="heading compact-heading"><div><h2>인턴십 연계</h2><p>우수 학생팀을 현장실습, 인턴십, 채용 검토로 연결합니다.</p></div></div>
    <div class="three-col">
      <article class="card"><span class="tag orange">하계 4주</span><h3>단기 현장실습</h3><p>문제 수행 후 결과 발표 우수팀을 단기 실습 후보로 등록합니다.</p><button class="primary" data-action="intern-apply" data-id="company-short">인턴십 연계 신청</button></article>
      <article class="card"><span class="tag blue">학기 중 8주</span><h3>장기 프로젝트형</h3><p>멘토링이 진행된 팀을 장기 검증형 인턴십으로 연결합니다.</p><button class="primary" data-action="intern-apply" data-id="company-long">인턴십 연계 신청</button></article>
      <article class="card"><span class="tag">채용 검토</span><h3>성과 기반 추천</h3><p>성과물과 멘토 평가를 기반으로 채용 검토 리스트를 구성합니다.</p><button class="secondary" data-route="company-portal:recommendations">추천팀 보기</button></article>
    </div>
  `;
}

function renderMouNda() {
  return `
    <div class="heading compact-heading"><div><h2>MOU/NDA 관리</h2><p>정적 MVP에서는 협약과 비밀유지 여부를 mock 상태로 확인합니다.</p></div></div>
    <div class="three-col">
      <article class="card"><h3>MOU 상태</h3><p>사업단 표준 협약서 검토 중</p><span class="status warn">검토 중</span></article>
      <article class="card"><h3>NDA 과제</h3><p>${state.problems.filter((problem) => problem.nda).length}개 실전문제에 NDA 필요 표시가 있습니다.</p><span class="status">관리 가능</span></article>
      <article class="card"><h3>데이터 제공</h3><p>샘플 데이터, 익명화 데이터, 현장 방문 범위를 문제별로 관리합니다.</p><span class="tag blue">mock</span></article>
    </div>
  `;
}

function renderAdminPortal(section = "dashboard") {
  const activeSection = section || "dashboard";
  const content = {
    dashboard: renderAdminDashboard,
    "raw-review": renderAdminRawReview,
    convert: renderAdminConvert,
    students: renderAdminStudents,
    companies: renderAdminCompanies,
    mentors: renderAdminMentors,
    matching: renderAdminMatching,
    education: () => unwrapPage(renderEducation()),
    internship: () => unwrapPage(renderInternship()),
    kpi: () => unwrapPage(renderKpi()),
    archive: renderDataArchive,
  }[activeSection] || renderAdminDashboard;

  return portalShell({
    eyebrow: "PROGRAM ADMIN PORTAL",
    title: "관리자 포털",
    description: "원본문제 접수부터 실전문제 공모, 학생팀 매칭, 멘토링, 성과 KPI까지 사업단 운영 흐름을 관리합니다.",
    baseRoute: "admin-portal",
    menu: adminPortalMenu,
    section: activeSection,
    actions: `<button class="secondary" type="button" data-action="reset-demo">데모 초기화</button>`,
    content: content(),
  });
}

function renderAdminDashboard() {
  const reviewing = state.rawProblems.filter((item) => ["접수", "검토 중", "재구성 필요"].includes(item.status)).length;
  const kpiAverage = Math.round(state.kpis.reduce((sum, [, value, target]) => sum + Math.min(100, (value / target) * 100), 0) / state.kpis.length);
  return `
    <div class="heading compact-heading"><div><h2>관리자 대시보드</h2><p>사업단 전체 운영 현황과 주요 병목을 확인합니다.</p></div></div>
    ${metricCards([
      ["접수된 원본문제", `${state.rawProblems.length}건`],
      ["검토 중인 문제", `${reviewing}건`],
      ["공모 등록된 실전문제", `${state.problems.length}건`],
      ["지원 팀", `${state.applications.length}팀`],
      ["등록 멘토", `${state.mentors.length}명`],
      ["인턴십 연계", `${state.internshipApplications.length}건`],
      ["KPI 달성률", `${kpiAverage}%`],
    ])}
    <section class="panel portal-panel">
      <h2>운영 흐름</h2>
      <div class="timeline admin-flow">${["원본문제 접수", "분과 검토", "사업단 재구성", "주제선정위 승인", "실전문제 공모 등록", "학생팀 매칭", "멘토링/성과관리"].map((item) => `<span>${item}</span>`).join("")}</div>
    </section>
  `;
}

function renderAdminRawReview() {
  return `<div class="heading compact-heading"><div><h2>원본문제 검토</h2><p>접수된 원본문제의 상태를 검토하고 변경합니다.</p></div></div>${rawProblemTable(state.rawProblems, true)}`;
}

function renderAdminConvert() {
  return `
    <div class="heading compact-heading"><div><h2>실전문제 카드 전환</h2><p>승인된 원본문제를 학생 연구팀이 수행 가능한 실전문제 카드로 바꿉니다.</p></div></div>
    ${rawProblemTable(state.rawProblems, true)}
    <section class="panel portal-panel"><h2>공모 등록된 실전문제</h2><div class="grid">${state.problems.map((problem) => problemCard(problem, calculateFit(currentProfile(), problem))).join("")}</div></section>
  `;
}

function renderAdminStudents() {
  return `
    <div class="heading compact-heading"><div><h2>학생/팀 관리</h2><p>학생 프로필과 연구팀 구성을 확인합니다.</p></div></div>
    <div class="two-col">
      <section class="panel"><h2>대표 학생 프로필</h2><p>${esc(state.profile.name)} · ${esc(state.profile.university)} · ${esc(state.profile.department)}</p><div class="chip-row">${chip(state.profile.skills, "blue")}</div></section>
      <section class="panel"><h2>연구팀</h2><div class="grid">${state.teams.map(teamSummaryCard).join("")}</div></section>
    </div>
  `;
}

function renderAdminCompanies() {
  const rows = state.rawProblems.map((item) => [item.companyName, item.manager, item.industry, item.status]);
  return `
    <div class="heading compact-heading"><div><h2>기업 관리</h2><p>등록 기업과 담당자, 문제 접수 상태를 확인합니다.</p></div></div>
    ${simpleTable(["기업", "담당자", "분야", "상태"], rows)}
  `;
}

function renderAdminMentors() {
  return `
    <div class="heading compact-heading"><div><h2>멘토 관리</h2><p>등록 멘토와 멘토링 로그를 관리합니다.</p></div></div>
    <div class="grid">
      <section class="panel"><h2>등록 멘토</h2><div class="three-col">${state.mentors.map((m) => `<article class="card"><h3>${esc(m.name)}</h3><p>${esc(m.organization)} · ${esc(m.field)}</p><span class="tag">${esc(m.email)}</span></article>`).join("")}</div></section>
      <section class="panel"><h2>멘토링 로그</h2>${mentorLogTable()}</section>
    </div>
  `;
}

function renderAdminMatching() {
  return `<div class="heading compact-heading"><div><h2>지원/매칭 관리</h2><p>학생팀 지원 현황과 매칭 상태를 확인합니다.</p></div></div>${applicationTable()}`;
}

function renderDataArchive() {
  return `
    <div class="heading compact-heading"><div><h2>데이터 아카이브</h2><p>문제, 팀, 멘토링, 교육, 인턴십 mock 데이터를 요약합니다.</p></div></div>
    ${metricCards([
      ["실전문제 데이터", `${state.problems.length}건`],
      ["원본문제 데이터", `${state.rawProblems.length}건`],
      ["팀 데이터", `${state.teams.length}건`],
      ["멘토링 로그", `${state.mentorLogs.length}건`],
      ["교육 신청", `${state.courseApplications.length}건`],
      ["인턴십 신청", `${state.internshipApplications.length}건`],
    ])}
  `;
}

function simpleTable(headers, rows) {
  return `
    <div class="table-scroll"><table>
      <thead><tr>${headers.map((head) => `<th>${esc(head)}</th>`).join("")}</tr></thead>
      <tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
    </table></div>
  `;
}

function renderAbout() {
  return `
    <main class="page">
      <section class="heading">
        <div>
          <p class="eyebrow" style="color: var(--teal-dark)">PROGRAM OVERVIEW</p>
          <h1>사업 소개</h1>
          <p>과제 JOB은 산업체 실전문제를 학부생 연구팀이 수행 가능한 과제로 재구성하고, 멘토링·특화교육·인턴십·성과관리로 연결하는 플랫폼입니다.</p>
        </div>
      </section>
      <section class="panel portal-panel">
        <h2>플랫폼 운영 구조</h2>
        <div class="timeline admin-flow">${["기업 문제 등록", "사업단 과제 재구성", "학생팀 매칭", "멘토링", "성과물 제출", "포트폴리오·채용 연계"].map((item) => `<span>${item}</span>`).join("")}</div>
      </section>
      <section class="section" style="padding-top: 24px">
        <div class="two-col">
          ${fields.map((field) => `<article class="card"><span class="tag orange">특화 분야</span><h3 style="margin-top: 12px">${esc(field)}</h3><p>산업체 수요를 실전문제로 발굴하고 학생 연구팀, 멘토, 교육 과정과 연결합니다.</p></article>`).join("")}
        </div>
      </section>
    </main>
  `;
}

function filters() {
  return {
    query: sessionStorage.getItem("filter-query") || "",
    field: sessionStorage.getItem("filter-field") || "",
    skill: sessionStorage.getItem("filter-skill") || "",
    region: sessionStorage.getItem("filter-region") || "",
    hostType: sessionStorage.getItem("filter-hostType") || "",
  };
}

function renderProblems() {
  const filter = filters();
  const skills = [...new Set(state.problems.flatMap((problem) => problem.requiredSkills))];
  const regions = [...new Set(state.problems.map((problem) => problem.region))];
  const hostTypes = [...new Set(state.problems.map((problem) => problem.hostType))];
  const q = filter.query.trim().toLowerCase();
  const rows = scoreProblemList(currentProfile(), state.problems).filter(({ problem }) => {
    const text = [problem.title, problem.host, problem.field, problem.requiredSkills.join(" "), problem.requiredMajors.join(" ")].join(" ").toLowerCase();
    return (
      (!q || text.includes(q)) &&
      (!filter.field || problem.field === filter.field) &&
      (!filter.skill || problem.requiredSkills.includes(filter.skill)) &&
      (!filter.region || problem.region === filter.region) &&
      (!filter.hostType || problem.hostType === filter.hostType)
    );
  });
  return `
    <main class="page">
      <div class="heading">
        <div>
          <p class="eyebrow" style="color: var(--teal-dark)">PRACTICAL PROBLEM CARDS</p>
          <h1>실전문제 공고</h1>
          <p>일반 채용공고가 아니라 산업체 문제를 학부생 연구팀이 수행 가능한 카드로 재구성한 공모 화면입니다.</p>
        </div>
        <button class="primary" type="button" data-route="student-portal:team">팀 매칭 시작</button>
      </div>
      <div class="layout">
        <aside class="panel filter-stack">
          <h2>필터</h2>
          ${filterInput("query", "검색", "과제명, 산업체명, 기술, 전공", filter.query)}
          ${selectInput("field", "분야", fields, filter.field)}
          ${selectInput("skill", "필요 역량", skills, filter.skill)}
          ${selectInput("region", "지역", regions, filter.region)}
          ${selectInput("hostType", "호스트 유형", hostTypes, filter.hostType)}
          <button class="secondary" type="button" data-action="clear-filters">필터 초기화</button>
        </aside>
        <section class="grid">
          ${rows.map(({ problem, fit }) => problemCard(problem, fit)).join("") || `<div class="empty">조건에 맞는 실전문제가 없습니다.</div>`}
        </section>
      </div>
    </main>
  `;
}

function filterInput(id, label, placeholder, value) {
  return `<div class="field"><label for="${id}">${label}</label><input id="${id}" data-filter="${id}" value="${esc(value)}" placeholder="${esc(placeholder)}" /></div>`;
}

function selectInput(id, label, options, value) {
  return `
    <div class="field">
      <label for="${id}">${label}</label>
      <select id="${id}" data-filter="${id}">
        <option value="">전체</option>
        ${options.map((option) => `<option value="${esc(option)}" ${option === value ? "selected" : ""}>${esc(option)}</option>`).join("")}
      </select>
    </div>
  `;
}

function problemCard(problem, fit) {
  return `
    <article class="problem-card">
      <div class="problem-head">
        <div>
          <span class="tag orange">${esc(problem.field)}</span>
          <span class="tag">${esc(problem.hostType)}</span>
          <h3>${esc(problem.title)}</h3>
          <p>${esc(problem.summary)}</p>
        </div>
        <span class="score">AI 적합도 ${fit.score}%</span>
      </div>
      <div class="meta-grid">
        <span><b>호스트 기관</b>${esc(problem.host)}</span>
        <span><b>연구기간</b>${esc(problem.duration)}</span>
        <span><b>연구비</b>${esc(problem.budget)}</span>
        <span><b>멘토</b>${esc(problem.mentor)}</span>
      </div>
      <div class="chip-row">${chip(problem.requiredSkills, "blue")}</div>
      <p><strong>예상 성과물:</strong> ${esc(problem.deliverables)}</p>
      <p><strong>1년 마일스톤:</strong> ${esc(problem.milestone.join(" → "))}</p>
      <p><strong>매칭 근거:</strong> ${esc(fit.reason)}</p>
      <div class="button-row">
        <button class="secondary" type="button" data-action="open-problem" data-id="${problem.id}">자세히 보기</button>
        <button class="primary" type="button" data-action="team-apply" data-id="${problem.id}">팀으로 지원하기</button>
        <button class="secondary" type="button" data-action="save-problem" data-id="${problem.id}">관심 과제 저장</button>
      </div>
    </article>
  `;
}

function renderProblemModal(problem) {
  const fit = calculateFit(currentProfile(), problem);
  return `
    <div class="modal-backdrop" data-action="close-modal">
      <article class="modal" role="dialog" aria-modal="true" aria-label="실전문제 상세" onclick="event.stopPropagation()">
        <div class="modal-head">
          <div>
            <span class="tag orange">${esc(problem.field)}</span>
            <h2 style="margin: 10px 0 0">${esc(problem.title)}</h2>
          </div>
          <button class="secondary" type="button" data-action="close-modal">닫기</button>
        </div>
        <div class="modal-body grid">
          <div class="meta-grid">
            <span><b>AI 적합도</b>${fit.score}%</span>
            <span><b>호스트</b>${esc(problem.host)}</span>
            <span><b>NDA</b>${problem.nda ? "필요" : "불필요"}</span>
            <span><b>인턴십</b>${problem.internship ? "연계 가능" : "검토 필요"}</span>
          </div>
          <section class="panel"><h3>과제 개요</h3><p>${esc(problem.summary)}</p></section>
          <section class="panel"><h3>문제 배경</h3><p>${esc(problem.background)}</p></section>
          <section class="panel"><h3>학부생 수행 가능 범위</h3><p>${esc(problem.scope)}</p></section>
          <section class="panel"><h3>필요 전공·기술</h3><div class="chip-row">${chip(problem.requiredMajors)}${chip(problem.requiredSkills, "blue")}</div></section>
          <section class="panel"><h3>1년 마일스톤</h3><div class="timeline">${problem.milestone.map((item) => `<span>${esc(item)}</span>`).join("")}</div></section>
          <section class="panel"><h3>성과물·멘토·연구비</h3><p><b>예상 성과물:</b> ${esc(problem.deliverables)}</p><p><b>멘토:</b> ${esc(problem.mentor)}</p><p><b>연구비 사용 가능 항목:</b> ${esc(problem.budgetItems.join(", "))}</p></section>
          <button class="primary" type="button" data-action="team-apply" data-id="${problem.id}">지원하기</button>
        </div>
      </article>
    </div>
  `;
}

function renderProfile() {
  const p = currentProfile();
  const recommended = scoreProblemList(p, state.problems).slice(0, 3);
  return `
    <main class="page">
      <div class="heading">
        <div>
          <p class="eyebrow" style="color: var(--teal-dark)">STUDENT CAPABILITY PROFILE</p>
          <h1>역량 프로필 등록</h1>
          <p>전공, 기술, 장비, 프로젝트 경험을 등록하면 실전문제별 AI 적합도 점수가 계산됩니다.</p>
        </div>
      </div>
      <div class="two-col">
        <form class="panel form-grid" id="profileForm">
          ${input("name", "이름", p.name)}
          ${input("university", "소속 대학", p.university)}
          ${input("department", "학과", p.department)}
          ${input("year", "학년", p.year)}
          ${input("email", "이메일", p.email, "email")}
          ${input("interests", "관심 분야", p.interests.join(", "))}
          ${input("skills", "보유 기술스택", p.skills.join(", "))}
          ${input("equipment", "사용 가능 장비/분석법", p.equipment.join(", "))}
          ${textarea("projects", "프로젝트 경험", p.projects)}
          ${input("portfolio", "포트폴리오 링크", p.portfolio)}
          ${input("preferredProblemType", "희망 과제 유형", p.preferredProblemType)}
          ${input("preferredInternshipType", "희망 인턴십 유형", p.preferredInternshipType)}
          <div class="field full"><button class="primary" type="submit">역량 프로필 저장</button></div>
        </form>
        <aside class="grid">
          <section class="panel">
            <h2>내 역량 프로필 요약</h2>
            <p>${esc(p.university)} · ${esc(p.department)} · ${esc(p.year)}</p>
            <div class="chip-row">${chip(p.interests, "orange")}${chip(p.skills, "blue")}${chip(p.equipment)}</div>
          </section>
          <section class="panel">
            <h2>프로필 기반 추천 실전문제</h2>
            ${recommended.map(({ problem, fit }) => `<p><b>${esc(problem.title)}</b><br /><span class="score">AI 적합도 ${fit.score}%</span> <span class="tag">${esc(fit.reason)}</span></p>`).join("")}
          </section>
        </aside>
      </div>
    </main>
  `;
}

function input(name, label, value = "", type = "text") {
  return `<div class="field"><label for="${name}">${label}</label><input id="${name}" name="${name}" type="${type}" value="${esc(value)}" /></div>`;
}

function textarea(name, label, value = "") {
  return `<div class="field full"><label for="${name}">${label}</label><textarea id="${name}" name="${name}">${esc(value)}</textarea></div>`;
}

function renderTeam() {
  const selected = sessionStorage.getItem("selected-problem") || state.problems[0]?.id;
  return `
    <main class="page">
      <div class="heading">
        <div><p class="eyebrow" style="color: var(--teal-dark)">TEAM MATCHING</p><h1>팀 매칭</h1><p>팀 역량을 구성하고 실전문제에 팀 단위로 지원합니다.</p></div>
      </div>
      <div class="two-col">
        <form class="panel form-grid" id="teamForm">
          <div class="field full"><h2>연구팀 만들기</h2></div>
          ${input("name", "팀명")}
          ${input("leader", "대표 학생", state.profile.name)}
          ${textarea("members", "팀원 목록")}
          ${input("university", "소속 대학", state.profile.university)}
          ${input("majors", "전공 구성")}
          ${input("skills", "보유 기술", state.profile.skills.join(", "))}
          ${selectField("preferredField", "희망 분야", fields)}
          ${selectProblem("problemId", "지원할 실전문제", selected)}
          <div class="field full"><button class="primary" type="submit">팀 생성</button></div>
        </form>
        <section class="grid">
          ${state.teams.map(teamCard).join("") || `<div class="empty">생성된 팀이 없습니다.</div>`}
        </section>
      </div>
    </main>
  `;
}

function selectField(name, label, options, value = "") {
  return `<div class="field"><label for="${name}">${label}</label><select id="${name}" name="${name}">${options.map((option) => `<option value="${esc(option)}" ${option === value ? "selected" : ""}>${esc(option)}</option>`).join("")}</select></div>`;
}

function selectProblem(name, label, value = "") {
  return `<div class="field"><label for="${name}">${label}</label><select id="${name}" name="${name}">${state.problems.map((problem) => `<option value="${problem.id}" ${problem.id === value ? "selected" : ""}>${esc(problem.title)}</option>`).join("")}</select></div>`;
}

function teamCard(team) {
  const problem = problemById(team.problemId);
  return `
    <article class="card">
      <span class="tag orange">${esc(team.preferredField)}</span>
      <h3 style="margin-top: 12px">${esc(team.name)}</h3>
      <p><b>대표:</b> ${esc(team.leader)} · <b>소속:</b> ${esc(team.university)}</p>
      <p><b>전공 구성:</b> ${esc(team.majors)}</p>
      <div class="chip-row">${chip(team.skills, "blue")}</div>
      <p><b>지원 과제:</b> ${esc(problem.title)}</p>
      <button class="primary" type="button" data-action="submit-team" data-team="${team.id}" data-id="${problem.id}">팀으로 지원하기</button>
    </article>
  `;
}

function teamSummaryCard(team) {
  const problem = problemById(team.problemId);
  return `
    <article class="card">
      <span class="tag orange">${esc(team.preferredField)}</span>
      <h3 style="margin-top: 12px">${esc(team.name)}</h3>
      <p><b>대표:</b> ${esc(team.leader)} · <b>소속:</b> ${esc(team.university)}</p>
      <p><b>전공 구성:</b> ${esc(team.majors)}</p>
      <div class="chip-row">${chip(team.skills, "blue")}</div>
      <p><b>관심 과제:</b> ${esc(problem.title)}</p>
      <span class="score">추천팀</span>
    </article>
  `;
}

function renderCompany() {
  return `
    <main class="page">
      <div class="heading">
        <div><p class="eyebrow" style="color: var(--teal-dark)">COMPANY CENTER</p><h1>산업체 센터</h1><p>산업체가 원본문제를 등록하고 검토 상태를 확인하는 화면입니다.</p></div>
      </div>
      <div class="two-col">
        <form class="panel form-grid" id="rawProblemForm">
          ${input("companyName", "기업명")}
          ${input("manager", "담당자명")}
          ${input("contact", "연락처")}
          ${input("industry", "산업 분야")}
          ${input("title", "문제 제목")}
          ${textarea("pain", "기술 애로 내용")}
          ${textarea("difficulty", "현재 해결이 어려운 이유")}
          ${input("deliverable", "희망 성과물")}
          ${input("majors", "필요 전공")}
          ${input("skills", "필요 기술")}
          ${selectField("mentorAvailable", "멘토 제공 가능 여부", ["가능", "불가", "검토 필요"])}
          ${selectField("nda", "NDA 필요 여부", ["필요", "불필요"])}
          ${selectField("internship", "인턴십 연계 가능 여부", ["가능", "불가", "검토 필요"])}
          <div class="field full"><button class="primary" type="submit">원본문제 등록</button></div>
        </form>
        <section class="panel">
          <h2>내가 등록한 문제 목록</h2>
          ${rawProblemTable(state.rawProblems)}
        </section>
      </div>
    </main>
  `;
}

function rawProblemTable(rows, admin = false) {
  if (!rows.length) return `<div class="empty">등록된 원본문제가 없습니다.</div>`;
  return `
    <div class="table-scroll">
      <table>
        <thead><tr><th>기업</th><th>원본문제</th><th>분야</th><th>상태</th>${admin ? "<th>관리</th>" : ""}</tr></thead>
        <tbody>
          ${rows
            .map(
              (item) => `
                <tr>
                  <td>${esc(item.companyName)}<br />${esc(item.manager)}</td>
                  <td>${esc(item.title)}<br /><span class="tag">${esc(item.date || "")}</span></td>
                  <td>${esc(item.industry)}</td>
                  <td><span class="status ${["접수", "검토 중", "재구성 필요"].includes(item.status) ? "warn" : ""}">${esc(item.status)}</span></td>
                  ${
                    admin
                      ? `<td><div class="button-row">
                          ${["검토 중", "재구성 필요", "승인", "반려"].map((status) => `<button class="tiny" type="button" data-action="raw-status" data-id="${item.id}" data-status="${status}">${status}</button>`).join("")}
                          <button class="primary" type="button" data-action="convert-raw" data-id="${item.id}">실전문제 카드로 전환</button>
                        </div></td>`
                      : ""
                  }
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderAdmin() {
  const approved = state.problems.length;
  const dashboard = [
    ["접수된 원본문제", state.rawProblems.length],
    ["승인된 실전문제", approved],
    ["지원 팀", state.applications.length],
    ["등록 학생", state.users.filter((u) => u.role === "student").length],
    ["멘토", state.mentors.length],
    ["인턴십 연계", state.internshipApplications.length],
  ];
  return `
    <main class="page">
      <div class="heading">
        <div><p class="eyebrow" style="color: var(--teal-dark)">PROGRAM ADMIN</p><h1>관리자 대시보드</h1><p>사업단 관리자가 원본문제 접수 → 분과 검토 → 재구성 → 주제선정위 승인 → 공모 등록 → 팀 매칭 흐름을 관리합니다.</p></div>
        <button class="secondary" type="button" data-action="reset-demo">데모 초기화</button>
      </div>
      <div class="stat-grid">${dashboard.map(([label, value]) => `<div class="stat"><strong>${value}</strong><span>${label}</span></div>`).join("")}</div>
      <section class="section" style="padding-bottom: 24px">
        <div class="timeline">${["원본문제 접수", "분과 검토", "재구성", "주제선정위 승인", "공모 등록", "팀 매칭"].map((item) => `<span>${item}</span>`).join("")}</div>
      </section>
      <div class="grid">
        <section class="panel"><h2>원본문제 검토</h2>${rawProblemTable(state.rawProblems, true)}</section>
        <section class="panel"><h2>멘토링 일지 확인</h2>${mentorLogTable()}</section>
        <section class="panel"><h2>팀 지원 내역</h2>${applicationTable()}</section>
      </div>
    </main>
  `;
}

function applicationTable() {
  if (!state.applications.length) return `<div class="empty">팀 지원 내역이 없습니다.</div>`;
  return `<div class="table-scroll"><table><thead><tr><th>팀</th><th>실전문제</th><th>일자</th><th>상태</th></tr></thead><tbody>${state.applications.map((item) => `<tr><td>${esc(teamById(item.teamId).name)}</td><td>${esc(problemById(item.problemId).title)}</td><td>${esc(item.date)}</td><td><span class="status">${esc(item.status)}</span></td></tr>`).join("")}</tbody></table></div>`;
}

function renderMentor() {
  return `
    <main class="page">
      <div class="heading"><div><p class="eyebrow" style="color: var(--teal-dark)">MENTOR CENTER</p><h1>멘토 센터</h1><p>멘토 프로필을 등록하고 멘토링 일지를 관리합니다.</p></div></div>
      <div class="two-col">
        <form class="panel form-grid" id="mentorForm">
          ${input("name", "이름")}
          ${input("organization", "소속 기관/기업")}
          ${input("field", "전문 분야")}
          ${input("problems", "담당 가능 과제")}
          ${input("method", "멘토링 가능 방식")}
          ${input("email", "이메일", "", "email")}
          <div class="field full"><button class="primary" type="submit">멘토 등록</button></div>
        </form>
        <form class="panel form-grid" id="mentorLogForm">
          <div class="field full"><h2>멘토링 로그</h2></div>
          ${input("team", "담당 팀")}
          ${input("problem", "담당 과제")}
          ${input("date", "멘토링 일자", new Date().toISOString().slice(0, 10), "date")}
          ${textarea("content", "진행 내용")}
          ${textarea("issue", "이슈 사항")}
          ${textarea("next", "다음 과제")}
          <div class="field full"><button class="primary" type="submit">멘토링 일지 저장</button></div>
        </form>
      </div>
      <section class="section"><div class="three-col">${state.mentors.map((m) => `<article class="card"><h3>${esc(m.name)}</h3><p>${esc(m.organization)} · ${esc(m.field)}</p><p>${esc(m.method)}</p><span class="tag">${esc(m.email)}</span></article>`).join("")}</div></section>
    </main>
  `;
}

function mentorLogTable() {
  if (!state.mentorLogs.length) return `<div class="empty">멘토링 일지가 없습니다.</div>`;
  return `<div class="table-scroll"><table><thead><tr><th>팀</th><th>과제</th><th>일자</th><th>내용</th><th>다음 과제</th></tr></thead><tbody>${state.mentorLogs.map((log) => `<tr><td>${esc(log.team)}</td><td>${esc(log.problem)}</td><td>${esc(log.date)}</td><td>${esc(log.content)}<br /><span class="tag orange">${esc(log.issue)}</span></td><td>${esc(log.next)}</td></tr>`).join("")}</tbody></table></div>`;
}

function renderEducation() {
  const courses = fields.flatMap((field) => modules.map((module) => ({ id: `${field}-${module}`, field, module, title: `${field} ${module} 과정`, method: "온라인 2회 + 현장 워크숍 1회", result: "미니 프로젝트 리포트" })));
  return `
    <main class="page">
      <div class="heading"><div><p class="eyebrow" style="color: var(--teal-dark)">SPECIALIZED EDUCATION</p><h1>특화교육</h1><p>4대 분야와 4종 모듈을 연결한 교육 신청 mock UI입니다.</p></div></div>
      <div class="three-col">
        ${courses
          .map((course) => {
            const applied = state.courseApplications.includes(course.id);
            return `<article class="card"><span class="tag orange">${esc(course.field)}</span><h3 style="margin-top: 12px">${esc(course.title)}</h3><p><b>모듈:</b> ${esc(course.module)}</p><p><b>운영:</b> ${esc(course.method)}</p><p><b>결과물:</b> ${esc(course.result)}</p><button class="${applied ? "secondary" : "primary"}" type="button" data-action="course-apply" data-id="${esc(course.id)}">${applied ? "신청 완료" : "신청"}</button></article>`;
          })
          .join("")}
      </div>
    </main>
  `;
}

function renderInternship() {
  const tracks = [
    ["정출연 트랙", "KIMS, RIST, KICET, ETRI와 연계해 연구개발 현장 실습을 지원합니다."],
    ["지자체·진흥기관 트랙", "대구TP, 경북TP, DIP 등 지역혁신기관과 실무형 프로젝트를 연결합니다."],
    ["산업체 트랙", "KATECH 및 참여 기업의 현장 과제와 채용 검토를 연계합니다."],
  ];
  const hosts = ["KIMS", "RIST", "KICET", "ETRI", "대구TP", "경북TP", "DIP", "KATECH"];
  return `
    <main class="page">
      <div class="heading"><div><p class="eyebrow" style="color: var(--teal-dark)">INTERNSHIP TRACKS</p><h1>인턴십</h1><p>실전문제 수행 성과를 인턴십과 채용 검토로 연결합니다.</p></div></div>
      <div class="three-col">${tracks.map(([name, desc]) => `<article class="card"><span class="tag blue">${esc(name)}</span><p>${esc(desc)}</p></article>`).join("")}</div>
      <section class="section">
        <div class="three-col">
          ${hosts
            .map((host, index) => {
              const id = `intern-${host}`;
              const applied = state.internshipApplications.includes(id);
              return `<article class="card"><h3>${esc(host)}</h3><p><b>분야:</b> ${esc(fields[index % fields.length])}</p><p><b>운영 기간:</b> 하계 4주 또는 학기 중 8주</p><p><b>보수 지급:</b> 사업단·호스트 공동 검토</p><p><b>연계 과제:</b> ${esc(state.problems[index % state.problems.length].title)}</p><button class="${applied ? "secondary" : "primary"}" type="button" data-action="intern-apply" data-id="${id}">${applied ? "신청 완료" : "인턴십 신청"}</button></article>`;
            })
            .join("")}
        </div>
      </section>
    </main>
  `;
}

function renderKpi() {
  return `
    <main class="page">
      <div class="heading"><div><p class="eyebrow" style="color: var(--teal-dark)">PERFORMANCE DASHBOARD</p><h1>성과·KPI</h1><p>성과 지표: 실전문제 40건, 참여 학생 200명, 연구팀·성과물·인턴십 연계를 발표용 대시보드 형태로 시각화합니다.</p></div></div>
      <div class="two-col">
        ${state.kpis
          .map(([label, value, target]) => {
            const percent = Math.min(100, Math.round((value / target) * 100));
            return `<article class="card"><div class="problem-head"><h3>${esc(label)}</h3><strong>${value}/${target}</strong></div><div class="progress"><span style="--value:${percent}%"></span></div><p>${percent}% 달성</p></article>`;
          })
          .join("")}
      </div>
    </main>
  `;
}

function renderLogin() {
  return `
    <main class="page">
      <div class="two-col">
        <form class="panel form-grid" id="loginForm">
          <div class="field full"><h1>로그인</h1><p>데모 계정: student@example.com / 1234</p></div>
          ${input("email", "이메일", "", "email")}
          ${input("password", "비밀번호", "", "password")}
          <div class="field full"><button class="primary" type="submit">로그인</button></div>
        </form>
        <section class="panel"><h2>역할별 마이페이지</h2><p>student, company, mentor, admin 역할에 따라 다른 요약 화면을 제공합니다.</p><button class="secondary" type="button" data-route="signup">회원가입</button></section>
      </div>
    </main>
  `;
}

function renderSignup() {
  return `
    <main class="page">
      <form class="panel form-grid" id="signupForm">
        <div class="field full"><h1>회원가입</h1><p>정적 MVP용 localStorage 기반 mock 회원가입입니다.</p></div>
        ${input("name", "이름")}
        ${input("email", "이메일", "", "email")}
        ${input("password", "비밀번호", "", "password")}
        ${selectField("role", "역할", ["student", "company", "mentor", "admin"])}
        <div class="field full"><button class="primary" type="submit">가입하고 시작하기</button></div>
      </form>
    </main>
  `;
}

function renderMypage() {
  const user = currentUser(state);
  if (!user) return renderLogin();
  const content = {
    student: `<p>내 역량 프로필, 지원 과제, 팀 정보, 추천 과제를 확인합니다.</p><div class="button-row"><button class="primary" data-route="student-portal">학생 포털</button><button class="secondary" data-route="student-portal:profile">역량 프로필</button><button class="secondary" data-route="student-portal:recommendations">추천 과제</button></div>`,
    company: `<p>등록한 원본문제와 검토 상태를 확인하고 멘토 등록으로 이어갑니다.</p><div class="button-row"><button class="primary" data-route="company-portal">기업 포털</button><button class="secondary" data-route="company-portal:mentor">멘토 등록</button></div>`,
    mentor: `<p>담당 과제와 멘토링 일지를 관리합니다.</p><button class="primary" data-route="company-portal:mentor">멘토 관련 화면</button>`,
    admin: `<p>사업단 관리자 대시보드로 이동합니다.</p><button class="primary" data-route="admin-portal">관리자 포털</button>`,
  }[user.role];
  return `<main class="page"><section class="panel"><h1>${esc(user.name)}님의 마이페이지</h1><span class="tag orange">${esc(user.role)}</span>${content}</section></main>`;
}

function bindSubmit(event) {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  event.preventDefault();
  const fd = new FormData(form);
  const get = (name) => String(fd.get(name) || "").trim();

  if (form.id === "profileForm") {
    Object.assign(state.profile, {
      name: get("name"),
      university: get("university"),
      department: get("department"),
      year: get("year"),
      email: get("email"),
      interests: toList(get("interests")),
      skills: toList(get("skills")),
      equipment: toList(get("equipment")),
      projects: get("projects"),
      portfolio: get("portfolio"),
      preferredProblemType: get("preferredProblemType"),
      preferredInternshipType: get("preferredInternshipType"),
    });
    persist("역량 프로필이 저장되었습니다.");
  }

  if (form.id === "teamForm") {
    state.teams.unshift({
      id: uid("team"),
      name: get("name"),
      leader: get("leader"),
      members: get("members"),
      university: get("university"),
      majors: get("majors"),
      skills: toList(get("skills")),
      preferredField: get("preferredField"),
      problemId: get("problemId"),
    });
    persist("팀이 생성되었습니다.");
  }

  if (form.id === "rawProblemForm") {
    state.rawProblems.unshift({
      id: uid("raw"),
      companyName: get("companyName"),
      manager: get("manager"),
      contact: get("contact"),
      industry: get("industry"),
      title: get("title"),
      pain: get("pain"),
      difficulty: get("difficulty"),
      deliverable: get("deliverable"),
      majors: toList(get("majors")),
      skills: toList(get("skills")),
      mentorAvailable: get("mentorAvailable") === "가능",
      nda: get("nda") === "필요",
      internship: get("internship") === "가능",
      status: "접수",
      date: new Date().toISOString().slice(0, 10),
    });
    persist("원본문제가 접수되었습니다.");
  }

  if (form.id === "mentorForm") {
    state.mentors.unshift({ id: uid("mentor"), name: get("name"), organization: get("organization"), field: get("field"), problems: get("problems"), method: get("method"), email: get("email") });
    persist("멘토 프로필이 등록되었습니다.");
  }

  if (form.id === "mentorLogForm") {
    state.mentorLogs.unshift({ id: uid("log"), team: get("team"), problem: get("problem"), date: get("date"), content: get("content"), issue: get("issue"), next: get("next") });
    persist("멘토링 일지가 저장되었습니다.");
  }

  if (form.id === "loginForm") {
    const result = login(state, get("email"), get("password"));
    if (!result.ok) return showToast(result.message);
    persist("로그인되었습니다.");
    go(defaultRouteForRole(result.user.role));
  }

  if (form.id === "signupForm") {
    const result = signup(state, { name: get("name"), email: get("email"), password: get("password"), role: get("role") });
    if (!result.ok) return showToast(result.message);
    persist("회원가입이 완료되었습니다.");
    go(defaultRouteForRole(result.user.role));
  }
}

function bindClick(event) {
  const routeButton = event.target.closest("[data-route]");
  if (routeButton) return go(routeButton.dataset.route);
  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;
  const { action, id, status, team } = actionButton.dataset;

  if (action === "logout") {
    logout(state);
    persist("로그아웃되었습니다.");
    return go("home");
  }
  if (action === "open-problem") {
    modalProblemId = id;
    return render();
  }
  if (action === "close-modal") {
    modalProblemId = null;
    return render();
  }
  if (action === "save-problem") {
    const saved = state.savedProblems.includes(id);
    if (!saved) state.savedProblems.push(id);
    return persist(saved ? "이미 관심 과제로 저장되어 있습니다." : "관심 과제로 저장되었습니다.");
  }
  if (action === "team-apply") {
    const message = applyTeamToProblem(id);
    if (message) persist(message);
    return;
  }
  if (action === "submit-team") {
    persist(submitApplication(team, id));
    return;
  }
  if (action === "raw-status") {
    const raw = state.rawProblems.find((item) => item.id === id);
    if (raw) raw.status = status;
    return persist(`${status} 상태로 변경되었습니다.`);
  }
  if (action === "convert-raw") return persist(convertRawProblem(id));
  if (action === "course-apply") {
    const applied = state.courseApplications.includes(id);
    if (!applied) state.courseApplications.push(id);
    return persist(applied ? "이미 신청한 교육입니다." : "교육 신청이 완료되었습니다.");
  }
  if (action === "intern-apply") {
    const applied = state.internshipApplications.includes(id);
    if (!applied) state.internshipApplications.push(id);
    return persist(applied ? "이미 신청한 인턴십입니다." : "인턴십 신청이 완료되었습니다.");
  }
  if (action === "clear-filters") {
    ["query", "field", "skill", "region", "hostType"].forEach((key) => sessionStorage.removeItem(`filter-${key}`));
    return render();
  }
  if (action === "reset-demo") {
    state = resetState();
    return persist("데모 데이터가 초기화되었습니다.");
  }
}

function applyTeamToProblem(problemId) {
  if (!state.teams.length) {
    sessionStorage.setItem("selected-problem", problemId);
    showToast("먼저 팀을 생성해 주세요.");
    go("student-portal:team");
    return;
  }
  return submitApplication(state.teams[0].id, problemId);
}

function submitApplication(teamId, problemId) {
  if (state.applications.some((item) => item.teamId === teamId && item.problemId === problemId)) {
    return "이미 해당 팀으로 지원한 실전문제입니다.";
  }
  state.applications.unshift({ id: uid("application"), teamId, problemId, date: new Date().toISOString().slice(0, 10), status: "접수" });
  return "팀 지원 내역이 저장되었습니다.";
}

function convertRawProblem(id) {
  const raw = state.rawProblems.find((item) => item.id === id);
  if (!raw) return "전환할 원본문제를 찾을 수 없습니다.";
  state.problems.unshift({
    id: uid("problem"),
    title: raw.title,
    field: fields.find((field) => raw.industry.includes(field.slice(0, 2))) || fields[0],
    host: raw.companyName,
    hostType: "산업체",
    region: "지역 협의",
    requiredMajors: raw.majors,
    requiredSkills: raw.skills,
    duration: "1년",
    budget: "10,000천원",
    mentor: raw.mentorAvailable ? `${raw.companyName} 현업 멘토` : "사업단 매칭 멘토",
    deliverables: raw.deliverable,
    summary: raw.pain,
    background: raw.difficulty,
    scope: "사업단 검토를 통해 학부생 수행 가능한 실험·분석·PoC 범위로 재구성합니다.",
    milestone: ["1Q 문헌조사·기초설계", "2Q 실험·개발·분석", "3Q 검증·성능평가", "4Q 최종보고·학회발표·산업체 보고"],
    budgetItems: ["재료·소모품", "분석 의뢰", "시제품·PoC", "성과 발표"],
    nda: raw.nda,
    internship: raw.internship,
  });
  raw.status = "공모 등록";
  return "원본문제를 실전문제 카드로 전환했습니다.";
}

function bindInput(event) {
  const filter = event.target.closest("[data-filter]");
  if (!filter) return;
  sessionStorage.setItem(`filter-${filter.dataset.filter}`, filter.value);
  render();
}

document.addEventListener("click", bindClick);
document.addEventListener("submit", bindSubmit);
document.addEventListener("input", bindInput);
document.addEventListener("change", bindInput);
window.addEventListener("hashchange", render);
render();
