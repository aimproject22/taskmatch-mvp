const STORAGE_KEY = "taskmatch-ai-mvp-state-v1";

const seedData = {
  participants: [
    {
      id: "p-user",
      name: "김민준",
      email: "minjun@example.com",
      major: "컴퓨터공학",
      skills: ["Python", "React", "SQL", "TensorFlow"],
      interests: ["AI", "데이터", "SaaS"],
      projects: "제조 불량 탐지 모델, 채용 플랫폼 웹 앱, 데이터 시각화 대시보드",
      portfolio: "https://portfolio.example.com/minjun",
      portfolioFile: "",
    },
    {
      id: "p-2",
      name: "이서연",
      email: "seoyeon@example.com",
      major: "산업디자인",
      skills: ["Figma", "React", "UX 리서치", "Notion"],
      interests: ["서비스기획", "HR", "교육"],
      projects: "B2B SaaS 온보딩 개선, 사용자 리서치 리포트, 디자인 시스템 구축",
      portfolio: "https://portfolio.example.com/seoyeon",
      portfolioFile: "",
    },
    {
      id: "p-3",
      name: "박지훈",
      email: "jihoon@example.com",
      major: "기계공학",
      skills: ["Python", "IoT", "Arduino", "데이터 분석"],
      interests: ["제조", "스마트팩토리", "물류"],
      projects: "설비 센서 데이터 수집, 공정 이상 탐지, 물류 라우팅 시뮬레이션",
      portfolio: "https://portfolio.example.com/jihoon",
      portfolioFile: "",
    },
    {
      id: "p-4",
      name: "최하린",
      email: "harin@example.com",
      major: "통계학",
      skills: ["Python", "SQL", "Tableau", "데이터 분석"],
      interests: ["HR", "데이터", "마케팅"],
      projects: "채용 전환율 분석, CRM 세그먼트 모델링, 실험 결과 리포트",
      portfolio: "https://portfolio.example.com/harin",
      portfolioFile: "",
    },
  ],
  companies: [
    {
      id: "co-user",
      name: "커리어브릿지랩",
      manager: "정다은",
      email: "daeun@careerbridge.example",
      field: "HR Tech",
      description: "대학·기업 연계형 과제 운영과 채용 전환을 지원하는 HR SaaS 기업",
    },
    {
      id: "co-1",
      name: "네오팩토리",
      manager: "오승현",
      email: "sh.oh@neofactory.example",
      field: "스마트팩토리",
      description: "제조 현장 데이터와 AI 검사 자동화 솔루션을 개발합니다.",
    },
    {
      id: "co-2",
      name: "케어링크",
      manager: "문지아",
      email: "jia@carelink.example",
      field: "헬스케어",
      description: "디지털 헬스케어 서비스의 고객 데이터 분석과 운영 최적화를 수행합니다.",
    },
  ],
  challenges: [
    {
      id: "t-user-1",
      companyId: "co-user",
      title: "참여자 역량 기반 추천 대시보드 MVP",
      description:
        "참여자 프로필과 과제 조건을 비교해 추천 과제를 보여주는 데모 대시보드를 설계하고, 핵심 지표를 시각화합니다.",
      field: "HR/데이터",
      requiredSkills: ["React", "SQL", "데이터 분석", "서비스기획"],
      duration: "4주",
      seats: 3,
      deliverable: "추천 화면 프로토타입, 매칭 지표 정의서, 발표 자료",
      benefits: "우수 결과물 포트폴리오 인증, 채용 검토, 멘토링",
    },
    {
      id: "t-1",
      companyId: "co-1",
      title: "AI 불량 유형 분류 모델 구축",
      description:
        "제조 이미지 샘플과 공정 로그를 활용해 불량 유형을 분류하는 초기 모델과 운영 리포트를 만듭니다.",
      field: "AI/제조",
      requiredSkills: ["Python", "TensorFlow", "Computer Vision", "데이터 분석"],
      duration: "6주",
      seats: 4,
      deliverable: "모델 노트북, 성능 리포트, 적용 시나리오",
      benefits: "현업 멘토링, 우수팀 인턴십 검토, 장비 데이터 샘플 제공",
    },
    {
      id: "t-2",
      companyId: "co-user",
      title: "HR 온보딩 데이터 대시보드",
      description:
        "신규 입사자 온보딩 데이터를 분석하고, 기업 담당자가 바로 볼 수 있는 웹 대시보드를 구현합니다.",
      field: "HR/데이터",
      requiredSkills: ["React", "SQL", "Data Visualization", "Tableau"],
      duration: "5주",
      seats: 2,
      deliverable: "웹 대시보드, KPI 정의서, 데이터 분석 리포트",
      benefits: "실무 데이터 분석 경험, 포트폴리오 리뷰, 채용 연계 인터뷰",
    },
    {
      id: "t-3",
      companyId: "co-2",
      title: "디지털 헬스케어 고객 이탈 예측",
      description:
        "서비스 이용 로그와 설문 데이터를 바탕으로 이탈 가능성이 높은 고객군을 찾고 개선 액션을 제안합니다.",
      field: "헬스케어/데이터",
      requiredSkills: ["Python", "SQL", "데이터 분석", "통계"],
      duration: "4주",
      seats: 3,
      deliverable: "예측 모델, 세그먼트 리포트, 개선 실험 제안",
      benefits: "데이터 멘토링, 우수자 과제비, 실무 추천서",
    },
    {
      id: "t-4",
      companyId: "co-1",
      title: "스마트 물류 경로 최적화 PoC",
      description:
        "배송 지점과 시간 제약 조건을 기반으로 물류 동선을 최적화하는 알고리즘 PoC를 수행합니다.",
      field: "물류/제조",
      requiredSkills: ["Python", "알고리즘", "IoT", "데이터 분석"],
      duration: "6주",
      seats: 3,
      deliverable: "최적화 알고리즘, 시뮬레이션 결과, 적용 가이드",
      benefits: "현장 데이터 샘플, 기술 멘토링, 산학협력 인증",
    },
    {
      id: "t-5",
      companyId: "co-user",
      title: "B2B SaaS 과제 운영 UX 개선",
      description:
        "기업 담당자와 참여자 인터뷰를 기반으로 과제 등록, 지원자 검토, 요청 발송 흐름을 개선합니다.",
      field: "서비스기획/UX",
      requiredSkills: ["Figma", "UX 리서치", "서비스기획", "Notion"],
      duration: "3주",
      seats: 2,
      deliverable: "사용자 여정 맵, 개선 와이어프레임, 우선순위 백로그",
      benefits: "프로덕트 멘토링, 디자인 리뷰, 포트폴리오 피드백",
    },
  ],
  applications: [
    { id: "a-1", challengeId: "t-2", participantId: "p-user", status: "pending", createdAt: "2026-06-10" },
    { id: "a-2", challengeId: "t-1", participantId: "p-4", status: "accepted", createdAt: "2026-06-08" },
    { id: "a-3", challengeId: "t-user-1", participantId: "p-2", status: "pending", createdAt: "2026-06-12" },
  ],
  invitations: [
    { id: "r-1", challengeId: "t-1", companyId: "co-1", participantId: "p-user", status: "pending", createdAt: "2026-06-11" },
    { id: "r-2", challengeId: "t-5", companyId: "co-user", participantId: "p-2", status: "accepted", createdAt: "2026-06-09" },
  ],
};

const app = document.querySelector("#app");
let state = loadState();
let toastTimer;

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(seedData);
  try {
    const parsed = JSON.parse(saved);
    return {
      ...structuredClone(seedData),
      ...parsed,
      participants: parsed.participants?.length ? parsed.participants : seedData.participants,
      companies: parsed.companies?.length ? parsed.companies : seedData.companies,
      challenges: parsed.challenges?.length ? parsed.challenges : seedData.challenges,
      applications: parsed.applications || seedData.applications,
      invitations: parsed.invitations || seedData.invitations,
    };
  } catch {
    return structuredClone(seedData);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function toArray(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  return String(value || "")
    .split(/[,/\n|]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function tokenSet(values) {
  return new Set(
    toArray(values)
      .flatMap((value) => normalize(value).split(/\s+/))
      .filter(Boolean),
  );
}

function companyById(id) {
  return state.companies.find((company) => company.id === id) || state.companies[0];
}

function participantById(id) {
  return state.participants.find((participant) => participant.id === id) || state.participants[0];
}

function challengeById(id) {
  return state.challenges.find((challenge) => challenge.id === id) || state.challenges[0];
}

function currentParticipant() {
  return participantById("p-user");
}

function currentCompany() {
  return companyById("co-user");
}

function relatedTerms(value) {
  const base = normalize(value);
  const map = {
    ai: ["인공지능", "머신러닝", "computer vision", "데이터", "python", "tensorflow"],
    "ai/제조": ["제조", "스마트팩토리", "불량", "computer vision", "데이터"],
    "hr/데이터": ["hr", "채용", "온보딩", "데이터", "dashboard", "tableau"],
    "헬스케어/데이터": ["헬스케어", "데이터", "통계", "예측", "sql"],
    "물류/제조": ["물류", "제조", "최적화", "iot", "알고리즘"],
    "서비스기획/ux": ["서비스기획", "ux", "figma", "리서치", "notion"],
    데이터: ["data", "sql", "통계", "분석", "dashboard"],
    제조: ["스마트팩토리", "공정", "불량", "iot"],
    hr: ["채용", "온보딩", "인재", "포트폴리오"],
  };
  return [base, ...(map[base] || [])].map(normalize);
}

function includesRelated(sourceValues, target) {
  const source = normalize(Array.isArray(sourceValues) ? sourceValues.join(" ") : sourceValues);
  return relatedTerms(target).some((term) => source.includes(term));
}

function calculateMatch(participant, challenge) {
  const participantSkills = tokenSet(participant.skills);
  const required = toArray(challenge.requiredSkills);
  const requiredTokens = required.map(normalize);
  const matchedSkills = required.filter((skill) => {
    const normalizedSkill = normalize(skill);
    return participantSkills.has(normalizedSkill) || includesRelated(participant.skills, normalizedSkill);
  });
  const skillScore = required.length ? (matchedSkills.length / required.length) * 45 : 0;

  const interestText = [...toArray(participant.interests), participant.major].join(" ");
  const fieldScore = includesRelated(interestText, challenge.field) ? 25 : 0;
  const majorScore = includesRelated(participant.major, challenge.field) ? 15 : includesRelated(challenge.field, participant.major) ? 10 : 0;

  const projectText = `${participant.projects} ${participant.interests?.join(" ")} ${participant.skills?.join(" ")}`;
  const projectMatches = requiredTokens.filter((skill) => includesRelated(projectText, skill)).length;
  const projectScore = Math.min(15, projectMatches * 4 + (includesRelated(projectText, challenge.field) ? 5 : 0));

  const score = Math.round(Math.min(100, skillScore + fieldScore + majorScore + projectScore));
  return {
    score,
    matchedSkills,
    breakdown: {
      "기술": Math.round(skillScore),
      "관심 분야": Math.round(fieldScore),
      "전공": Math.round(majorScore),
      "프로젝트": Math.round(projectScore),
    },
  };
}

function statusLabel(status) {
  return {
    pending: "대기중",
    accepted: "수락됨",
    rejected: "거절됨",
  }[status] || status;
}

function statusChip(status) {
  return `<span class="status ${escapeHtml(status)}">${statusLabel(status)}</span>`;
}

function scoreClass(score) {
  if (score >= 78) return "high";
  if (score >= 55) return "mid";
  return "low";
}

function formatTags(tags, tone = "") {
  return toArray(tags)
    .map((tag) => `<span class="tag ${tone}">${escapeHtml(tag)}</span>`)
    .join("");
}

function matchForCurrent(challenge) {
  return calculateMatch(currentParticipant(), challenge);
}

function applicationFor(challengeId, participantId = "p-user") {
  return state.applications.find((item) => item.challengeId === challengeId && item.participantId === participantId);
}

function invitationFor(challengeId, participantId) {
  return state.invitations.find((item) => item.challengeId === challengeId && item.participantId === participantId);
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2600);
}

function navigate(route) {
  location.hash = route;
}

function getRoute() {
  return location.hash.replace("#", "") || "home";
}

function setActiveNav(route) {
  document.querySelectorAll("[data-route]").forEach((button) => {
    const target = button.dataset.route;
    button.classList.toggle("active", target === route || (route.startsWith("task-detail") && target === "tasks"));
  });
}

function renderHome() {
  const totalMatches = state.challenges.length * state.participants.length;
  app.innerHTML = `
    <section class="hero">
      <div class="hero-inner">
        <div class="hero-content">
          <p class="eyebrow">AI Matching MVP · 기업 실전 과제 · 포트폴리오 연계</p>
          <h1>기업 과제와 참여자 역량을 연결하는 TaskMatch AI</h1>
          <p>참여자 프로필과 기업의 실제 산업 과제를 비교해 적합도를 보여주고, 지원과 참여 요청을 하나의 흐름으로 관리하는 과제 기반 인재 매칭 플랫폼입니다.</p>
          <div class="hero-actions">
            <button class="primary-button" type="button" data-route="participant">참여자 대시보드</button>
            <button class="ghost-button" type="button" data-route="company">기업 대시보드</button>
            <button class="ghost-button" type="button" data-route="tasks">과제 둘러보기</button>
          </div>
        </div>
      </div>
    </section>

    <div class="hero-metrics" aria-label="서비스 주요 지표">
      <div class="metric"><strong>${state.challenges.length}</strong><span>등록된 산업 과제</span></div>
      <div class="metric"><strong>${state.participants.length}</strong><span>참여자 프로필</span></div>
      <div class="metric"><strong>${totalMatches}</strong><span>계산 가능한 매칭 조합</span></div>
    </div>

    <section class="section">
      <div class="section-inner">
        <div class="section-heading">
          <div>
            <h2>문제 정의</h2>
            <p>기업은 검증된 실무형 인재를 찾기 어렵고, 참여자는 자신의 역량을 실제 결과물로 증명할 기회가 부족합니다.</p>
          </div>
        </div>
        <div class="problem-grid">
          <article class="info-card">
            <h3>역량 정보의 단절</h3>
            <p>이력서, 프로젝트, 기술스택이 과제 조건과 따로 관리되어 기업이 적합성을 빠르게 판단하기 어렵습니다.</p>
          </article>
          <article class="info-card">
            <h3>실전 경험 부족</h3>
            <p>참여자는 산업 과제를 수행하며 포트폴리오를 만들 수 있는 구조화된 경로가 필요합니다.</p>
          </article>
          <article class="info-card">
            <h3>채용 연계의 공백</h3>
            <p>과제 결과물이 채용 검토와 연결되지 않으면 기업과 참여자 모두 후속 가치를 놓치게 됩니다.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section alt">
      <div class="section-inner">
        <div class="section-heading">
          <div>
            <h2>참여자와 기업의 이용 흐름</h2>
            <p>프로필 등록, 과제 등록, 매칭 점수 확인, 지원과 요청, 결과물 축적까지 MVP의 핵심 흐름을 한 화면에서 보여줍니다.</p>
          </div>
        </div>
        <div class="flow">
          <article class="flow-step"><span>1</span><h3>프로필·과제 등록</h3><p>참여자는 역량 정보를, 기업은 실제 산업 과제를 등록합니다.</p></article>
          <article class="flow-step"><span>2</span><h3>적합도 계산</h3><p>기술스택, 전공, 관심 분야, 프로젝트 경험을 비교해 0~100점으로 표시합니다.</p></article>
          <article class="flow-step"><span>3</span><h3>지원·참여 요청</h3><p>참여자 지원과 기업 요청을 각각 대기중, 수락됨, 거절됨 상태로 관리합니다.</p></article>
          <article class="flow-step"><span>4</span><h3>성과 연계</h3><p>수행 결과물을 포트폴리오로 축적하고 채용 검토로 이어갑니다.</p></article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-inner">
        <div class="section-heading">
          <div>
            <h2>핵심 기능</h2>
            <p>사업계획서 발표에서 바로 설명 가능한 MVP 단위로 구성했습니다.</p>
          </div>
        </div>
        <div class="feature-grid">
          <article class="feature-card"><h3>참여자 프로필</h3><p>전공, 기술스택, 관심 분야, 이전 프로젝트, 포트폴리오를 등록합니다.</p></article>
          <article class="feature-card"><h3>기업 과제 등록</h3><p>과제명, 필요 기술, 기간, 모집 인원, 결과물, 제공 혜택을 관리합니다.</p></article>
          <article class="feature-card"><h3>매칭 점수</h3><p>초기 버전은 rule-based 점수로 추천 과제와 추천 인재를 정렬합니다.</p></article>
          <article class="feature-card"><h3>관리자 모니터링</h3><p>참여자, 기업, 과제, 지원 내역, 요청 내역을 mock data 기반으로 확인합니다.</p></article>
        </div>
      </div>
    </section>

    <section class="section alt">
      <div class="section-inner">
        <div class="section-heading">
          <div>
            <h2>과제 이후의 성과 흐름</h2>
            <p>서비스의 핵심 가치는 단순 매칭이 아니라 과제 수행 결과가 포트폴리오와 채용 연계로 이어지는 구조입니다.</p>
          </div>
          <button class="link-button" type="button" data-route="admin">전체 데이터 보기</button>
        </div>
        <div class="flow">
          <article class="flow-step"><span>A</span><h3>프로젝트 수행</h3><p>기업 멘토링과 실제 조건을 기반으로 과제를 수행합니다.</p></article>
          <article class="flow-step"><span>B</span><h3>결과물 제출</h3><p>모델, 대시보드, 리포트, 와이어프레임 등 실무 산출물을 제출합니다.</p></article>
          <article class="flow-step"><span>C</span><h3>포트폴리오 축적</h3><p>과제 정보와 산출물 링크가 참여자 프로필에 누적됩니다.</p></article>
          <article class="flow-step"><span>D</span><h3>취업·채용 연계</h3><p>우수 참여자는 인터뷰, 인턴십, 채용 검토로 연결됩니다.</p></article>
        </div>
      </div>
    </section>
  `;
}

function renderParticipantDashboard() {
  const participant = currentParticipant();
  const recommendations = state.challenges
    .map((challenge) => ({ challenge, match: calculateMatch(participant, challenge) }))
    .sort((a, b) => b.match.score - a.match.score)
    .slice(0, 4);
  const myApplications = state.applications.filter((item) => item.participantId === participant.id);
  const myInvitations = state.invitations.filter((item) => item.participantId === participant.id);

  app.innerHTML = `
    <section class="page">
      <div class="page-heading">
        <div>
          <span class="page-kicker">PARTICIPANT DASHBOARD</span>
          <h1>${escapeHtml(participant.name)}님의 과제 매칭 현황</h1>
          <p>등록된 프로필을 기준으로 추천 과제와 기업 참여 요청을 확인합니다.</p>
        </div>
        <div class="button-row">
          <button class="ghost-button" type="button" data-route="profile">프로필 수정</button>
          <button class="primary-button" type="button" data-route="tasks">과제 지원하기</button>
        </div>
      </div>

      <div class="dashboard-grid">
        <aside class="panel">
          <div class="panel-heading">
            <div>
              <h2>프로필 요약</h2>
              <p>매칭 계산에 사용되는 현재 정보입니다.</p>
            </div>
          </div>
          <div class="profile-summary">
            <div class="profile-meta">
              <span><strong>이메일</strong>${escapeHtml(participant.email)}</span>
              <span><strong>전공</strong>${escapeHtml(participant.major)}</span>
              <span><strong>포트폴리오</strong>${escapeHtml(participant.portfolioFile || participant.portfolio || "미등록")}</span>
            </div>
            <div class="tag-row">${formatTags(participant.skills)}</div>
            <div class="tag-row">${formatTags(participant.interests, "amber")}</div>
          </div>
        </aside>

        <div>
          <section class="panel">
            <div class="panel-heading">
              <div>
                <h2>추천 과제</h2>
                <p>기술스택, 관심 분야, 전공, 프로젝트 경험 기반 추천입니다.</p>
              </div>
            </div>
            <div class="match-list">
              ${recommendations.map(({ challenge, match }) => renderTaskCard(challenge, match, "participant")).join("")}
            </div>
          </section>

          <section class="table-panel">
            <div class="panel-heading">
              <div>
                <h2>내 지원 내역</h2>
                <p>참여자가 기업 과제에 직접 지원한 흐름입니다.</p>
              </div>
            </div>
            ${renderApplicationTable(myApplications, "participant")}
          </section>

          <section class="table-panel">
            <div class="panel-heading">
              <div>
                <h2>기업 참여 요청</h2>
                <p>기업이 참여자 프로필을 보고 보낸 과제 참여 요청입니다.</p>
              </div>
            </div>
            ${renderInvitationTable(myInvitations, "participant")}
          </section>
        </div>
      </div>
    </section>
  `;
}

function renderProfileForm() {
  const participant = currentParticipant();
  app.innerHTML = `
    <section class="page">
      <div class="page-heading">
        <div>
          <span class="page-kicker">PROFILE REGISTRATION</span>
          <h1>참여자 프로필 등록</h1>
          <p>입력한 정보는 과제 추천 점수와 기업의 참여 요청 판단에 반영됩니다.</p>
        </div>
        <button class="ghost-button" type="button" data-route="participant">대시보드로 이동</button>
      </div>

      <form class="panel form-grid" id="profileForm">
        <div class="field">
          <label for="name">이름</label>
          <input id="name" name="name" value="${escapeHtml(participant.name)}" required />
        </div>
        <div class="field">
          <label for="email">이메일</label>
          <input id="email" name="email" type="email" value="${escapeHtml(participant.email)}" required />
        </div>
        <div class="field">
          <label for="major">전공</label>
          <input id="major" name="major" value="${escapeHtml(participant.major)}" required />
        </div>
        <div class="field">
          <label for="skills">기술스택</label>
          <input id="skills" name="skills" value="${escapeHtml(participant.skills.join(", "))}" placeholder="Python, React, SQL" required />
        </div>
        <div class="field full">
          <label for="interests">관심 분야</label>
          <input id="interests" name="interests" value="${escapeHtml(participant.interests.join(", "))}" placeholder="AI, 데이터, HR" required />
        </div>
        <div class="field full">
          <label for="projects">이전 프로젝트</label>
          <textarea id="projects" name="projects" required>${escapeHtml(participant.projects)}</textarea>
        </div>
        <div class="field">
          <label for="portfolio">포트폴리오 링크</label>
          <input id="portfolio" name="portfolio" value="${escapeHtml(participant.portfolio)}" placeholder="https://..." />
        </div>
        <div class="field">
          <label for="portfolioFile">포트폴리오 파일 정보</label>
          <input id="portfolioFile" name="portfolioFile" type="file" />
        </div>
        <div class="form-actions">
          <button class="primary-button" type="submit">프로필 저장</button>
          <button class="ghost-button" type="button" data-route="participant">취소</button>
        </div>
      </form>
    </section>
  `;

  document.querySelector("#profileForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const file = document.querySelector("#portfolioFile").files[0];
    Object.assign(participant, {
      name: form.get("name").trim(),
      email: form.get("email").trim(),
      major: form.get("major").trim(),
      skills: toArray(form.get("skills")),
      interests: toArray(form.get("interests")),
      projects: form.get("projects").trim(),
      portfolio: form.get("portfolio").trim(),
      portfolioFile: file?.name || participant.portfolioFile || "",
    });
    saveState();
    showToast("참여자 프로필이 저장되었습니다.");
    navigate("participant");
  });
}

function renderCompanyDashboard() {
  const company = currentCompany();
  const myChallenges = state.challenges.filter((challenge) => challenge.companyId === company.id);
  const challengeOptions = myChallenges
    .map((challenge) => `<option value="${challenge.id}">${escapeHtml(challenge.title)}</option>`)
    .join("");
  const selectedChallenge = myChallenges[0] || state.challenges[0];
  const recommendedPeople = state.participants
    .map((participant) => ({ participant, match: calculateMatch(participant, selectedChallenge) }))
    .sort((a, b) => b.match.score - a.match.score)
    .slice(0, 4);

  app.innerHTML = `
    <section class="page">
      <div class="page-heading">
        <div>
          <span class="page-kicker">COMPANY DASHBOARD</span>
          <h1>${escapeHtml(company.name)} 과제 운영</h1>
          <p>기업 정보와 등록 과제, 지원자, 추천 인재, 참여 요청을 관리합니다.</p>
        </div>
        <div class="button-row">
          <button class="ghost-button" type="button" data-route="task-new">과제 등록</button>
          <button class="primary-button" type="button" data-route="tasks">전체 과제 보기</button>
        </div>
      </div>

      <div class="two-column">
        <form class="panel form-grid" id="companyForm">
          <div class="field full">
            <div class="panel-heading">
              <div>
                <h2>기업 정보</h2>
                <p>기업과 담당자 정보를 등록합니다.</p>
              </div>
            </div>
          </div>
          <div class="field">
            <label for="companyName">기업명</label>
            <input id="companyName" name="name" value="${escapeHtml(company.name)}" required />
          </div>
          <div class="field">
            <label for="manager">담당자</label>
            <input id="manager" name="manager" value="${escapeHtml(company.manager)}" required />
          </div>
          <div class="field">
            <label for="companyEmail">담당자 이메일</label>
            <input id="companyEmail" name="email" type="email" value="${escapeHtml(company.email)}" required />
          </div>
          <div class="field">
            <label for="companyField">기업 분야</label>
            <input id="companyField" name="field" value="${escapeHtml(company.field)}" required />
          </div>
          <div class="field full">
            <label for="companyDescription">기업 소개</label>
            <textarea id="companyDescription" name="description" required>${escapeHtml(company.description)}</textarea>
          </div>
          <div class="form-actions">
            <button class="primary-button" type="submit">기업 정보 저장</button>
          </div>
        </form>

        <section class="panel">
          <div class="panel-heading">
            <div>
              <h2>추천 인재</h2>
              <p>선택된 과제 기준으로 적합도가 높은 참여자를 보여줍니다.</p>
            </div>
          </div>
          <div class="field">
            <label for="recommendChallenge">추천 기준 과제</label>
            <select id="recommendChallenge" data-action="select-recommendation">
              ${challengeOptions}
            </select>
          </div>
          <div class="people-list" id="recommendedPeople">
            ${recommendedPeople.map(({ participant, match }) => renderProfileCard(participant, selectedChallenge, match)).join("")}
          </div>
        </section>
      </div>

      <section class="table-panel">
        <div class="panel-heading">
          <div>
            <h2>등록 과제와 지원자</h2>
            <p>각 과제별 지원자 상태를 확인하고 수락 또는 거절할 수 있습니다.</p>
          </div>
        </div>
        ${myChallenges.map((challenge) => renderCompanyChallengeBlock(challenge)).join("") || `<div class="empty">등록된 과제가 없습니다.</div>`}
      </section>

      <section class="table-panel">
        <div class="panel-heading">
          <div>
            <h2>보낸 참여 요청</h2>
            <p>기업이 참여자에게 보낸 요청의 처리 상태입니다.</p>
          </div>
        </div>
        ${renderInvitationTable(state.invitations.filter((item) => item.companyId === company.id), "company")}
      </section>
    </section>
  `;

  document.querySelector("#companyForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    Object.assign(company, {
      name: form.get("name").trim(),
      manager: form.get("manager").trim(),
      email: form.get("email").trim(),
      field: form.get("field").trim(),
      description: form.get("description").trim(),
    });
    saveState();
    showToast("기업 정보가 저장되었습니다.");
    render();
  });

  const select = document.querySelector("#recommendChallenge");
  select?.addEventListener("change", () => {
    const challenge = challengeById(select.value);
    const list = state.participants
      .map((participant) => ({ participant, match: calculateMatch(participant, challenge) }))
      .sort((a, b) => b.match.score - a.match.score)
      .slice(0, 4)
      .map(({ participant, match }) => renderProfileCard(participant, challenge, match))
      .join("");
    document.querySelector("#recommendedPeople").innerHTML = list;
  });
}

function renderTaskForm() {
  const company = currentCompany();
  app.innerHTML = `
    <section class="page">
      <div class="page-heading">
        <div>
          <span class="page-kicker">CHALLENGE REGISTRATION</span>
          <h1>기업 과제 등록</h1>
          <p>실제 산업 문제를 수행 가능한 과제 단위로 등록합니다.</p>
        </div>
        <button class="ghost-button" type="button" data-route="company">기업 대시보드</button>
      </div>

      <form class="panel form-grid" id="taskForm">
        <div class="field">
          <label for="taskTitle">과제명</label>
          <input id="taskTitle" name="title" placeholder="예: 고객 이탈 예측 모델 구축" required />
        </div>
        <div class="field">
          <label for="taskField">분야</label>
          <input id="taskField" name="field" placeholder="AI/데이터, 서비스기획/UX" required />
        </div>
        <div class="field full">
          <label for="taskDescription">과제 설명</label>
          <textarea id="taskDescription" name="description" required></textarea>
        </div>
        <div class="field">
          <label for="requiredSkills">필요 기술</label>
          <input id="requiredSkills" name="requiredSkills" placeholder="Python, SQL, React" required />
        </div>
        <div class="field">
          <label for="duration">수행 기간</label>
          <input id="duration" name="duration" placeholder="4주" required />
        </div>
        <div class="field">
          <label for="seats">모집 인원</label>
          <input id="seats" name="seats" type="number" min="1" value="3" required />
        </div>
        <div class="field">
          <label for="deliverable">제출 결과물</label>
          <input id="deliverable" name="deliverable" placeholder="프로토타입, 분석 리포트, 발표 자료" required />
        </div>
        <div class="field full">
          <label for="benefits">제공 혜택</label>
          <textarea id="benefits" name="benefits" required>현업 멘토링, 포트폴리오 인증, 우수자 채용 검토</textarea>
        </div>
        <div class="form-actions">
          <button class="primary-button" type="submit">과제 등록</button>
          <button class="ghost-button" type="button" data-route="company">취소</button>
        </div>
      </form>
    </section>
  `;

  document.querySelector("#taskForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    state.challenges.unshift({
      id: `t-${Date.now()}`,
      companyId: company.id,
      title: form.get("title").trim(),
      description: form.get("description").trim(),
      field: form.get("field").trim(),
      requiredSkills: toArray(form.get("requiredSkills")),
      duration: form.get("duration").trim(),
      seats: Number(form.get("seats")),
      deliverable: form.get("deliverable").trim(),
      benefits: form.get("benefits").trim(),
    });
    saveState();
    showToast("기업 과제가 등록되었습니다.");
    navigate("company");
  });
}

function renderTasks() {
  const fields = [...new Set(state.challenges.map((challenge) => challenge.field))];
  const cards = state.challenges
    .map((challenge) => ({ challenge, match: matchForCurrent(challenge) }))
    .sort((a, b) => b.match.score - a.match.score)
    .map(({ challenge, match }) => renderTaskCard(challenge, match, "tasks"))
    .join("");

  app.innerHTML = `
    <section class="page">
      <div class="page-heading">
        <div>
          <span class="page-kicker">CHALLENGE LIST</span>
          <h1>기업 과제 목록</h1>
          <p>참여자 프로필 기준 매칭 점수와 함께 모든 과제를 확인합니다.</p>
        </div>
        <button class="primary-button" type="button" data-route="task-new">기업 과제 등록</button>
      </div>

      <div class="filter-bar">
        <input id="searchInput" type="search" placeholder="과제명, 기업명, 기술 검색" />
        <select id="fieldFilter">
          <option value="">전체 분야</option>
          ${fields.map((field) => `<option value="${escapeHtml(field)}">${escapeHtml(field)}</option>`).join("")}
        </select>
        <select id="scoreFilter">
          <option value="0">전체 점수</option>
          <option value="70">70점 이상</option>
          <option value="50">50점 이상</option>
        </select>
      </div>

      <div class="task-list" id="taskList">${cards}</div>
    </section>
  `;

  const filter = () => {
    const query = normalize(document.querySelector("#searchInput").value);
    const field = document.querySelector("#fieldFilter").value;
    const minScore = Number(document.querySelector("#scoreFilter").value);
    const filtered = state.challenges
      .map((challenge) => ({ challenge, match: matchForCurrent(challenge) }))
      .filter(({ challenge, match }) => {
        const company = companyById(challenge.companyId);
        const text = normalize(`${challenge.title} ${challenge.description} ${challenge.requiredSkills.join(" ")} ${company.name}`);
        return (!query || text.includes(query)) && (!field || challenge.field === field) && match.score >= minScore;
      })
      .sort((a, b) => b.match.score - a.match.score)
      .map(({ challenge, match }) => renderTaskCard(challenge, match, "tasks"))
      .join("");
    document.querySelector("#taskList").innerHTML = filtered || `<div class="empty">조건에 맞는 과제가 없습니다.</div>`;
  };

  document.querySelector("#searchInput").addEventListener("input", filter);
  document.querySelector("#fieldFilter").addEventListener("change", filter);
  document.querySelector("#scoreFilter").addEventListener("change", filter);
}

function renderTaskDetail(id) {
  const challenge = challengeById(id);
  const company = companyById(challenge.companyId);
  const match = matchForCurrent(challenge);
  const appItem = applicationFor(challenge.id);

  app.innerHTML = `
    <section class="page">
      <div class="page-heading">
        <div>
          <span class="page-kicker">CHALLENGE DETAIL</span>
          <h1>과제 상세</h1>
          <p>과제 조건과 현재 참여자 기준 매칭 근거를 확인합니다.</p>
        </div>
        <button class="ghost-button" type="button" data-route="tasks">목록으로 이동</button>
      </div>

      <div class="detail-layout">
        <article>
          <div class="detail-hero">
            <span class="score-pill ${scoreClass(match.score)}">${match.score}점 매칭</span>
            <h1>${escapeHtml(challenge.title)}</h1>
            <p>${escapeHtml(challenge.description)}</p>
          </div>

          <section class="panel">
            <div class="panel-heading">
              <div>
                <h2>과제 조건</h2>
                <p>${escapeHtml(company.name)} · ${escapeHtml(challenge.field)}</p>
              </div>
            </div>
            <div class="task-meta">
              <span><b>수행 기간</b>${escapeHtml(challenge.duration)}</span>
              <span><b>모집 인원</b>${escapeHtml(challenge.seats)}명</span>
              <span><b>제출 결과물</b>${escapeHtml(challenge.deliverable)}</span>
              <span><b>제공 혜택</b>${escapeHtml(challenge.benefits)}</span>
            </div>
            <div class="tag-row">${formatTags(challenge.requiredSkills)}</div>
          </section>

          <section class="panel">
            <div class="panel-heading">
              <div>
                <h2>기업 정보</h2>
                <p>${escapeHtml(company.description)}</p>
              </div>
            </div>
            <div class="profile-meta">
              <span><strong>담당자</strong>${escapeHtml(company.manager)}</span>
              <span><strong>이메일</strong>${escapeHtml(company.email)}</span>
              <span><strong>분야</strong>${escapeHtml(company.field)}</span>
            </div>
          </section>
        </article>

        <aside class="panel">
          <div class="panel-heading">
            <div>
              <h2>매칭 분석</h2>
              <p>${escapeHtml(currentParticipant().name)}님의 프로필 기준입니다.</p>
            </div>
          </div>
          <div class="score-box">
            <div class="score-ring" style="--score: ${match.score}">${match.score}</div>
            <small>필요 기술 ${match.matchedSkills.length}개 일치<br />${match.matchedSkills.map(escapeHtml).join(", ") || "직접 일치 기술 없음"}</small>
          </div>
          <div class="breakdown">
            ${Object.entries(match.breakdown)
              .map(
                ([label, value]) => `
                  <div class="breakdown-row">
                    <strong>${escapeHtml(label)}</strong>
                    <div class="bar"><span style="--value: ${Math.min(100, Math.round((value / ({ "기술": 45, "관심 분야": 25, "전공": 15, "프로젝트": 15 }[label] || 45)) * 100))}%"></span></div>
                    <span>${value}</span>
                  </div>
                `,
              )
              .join("")}
          </div>
          <div class="button-row" style="margin-top: 20px">
            ${
              appItem
                ? `<span class="status ${appItem.status}">${statusLabel(appItem.status)}</span>`
                : `<button class="primary-button" type="button" data-action="apply" data-id="${challenge.id}">과제 지원</button>`
            }
            <button class="ghost-button" type="button" data-route="participant">내 대시보드</button>
          </div>
        </aside>
      </div>
    </section>
  `;
}

function renderAdmin() {
  app.innerHTML = `
    <section class="page">
      <div class="page-heading">
        <div>
          <span class="page-kicker">ADMIN DASHBOARD</span>
          <h1>관리자 대시보드</h1>
          <p>mock data 기반으로 전체 참여자, 기업, 과제, 지원 내역, 참여 요청 내역을 확인합니다.</p>
        </div>
        <button class="ghost-button" type="button" data-action="reset-demo">데모 데이터 초기화</button>
      </div>

      <div class="hero-metrics" style="margin: 0 0 18px; width: 100%">
        <div class="metric"><strong>${state.participants.length}</strong><span>참여자</span></div>
        <div class="metric"><strong>${state.companies.length}</strong><span>기업</span></div>
        <div class="metric"><strong>${state.applications.length + state.invitations.length}</strong><span>지원·요청 흐름</span></div>
      </div>

      <div class="admin-grid">
        <section class="table-panel">
          <div class="panel-heading"><div><h2>참여자</h2><p>등록된 역량 정보입니다.</p></div></div>
          ${renderParticipantTable()}
        </section>
        <section class="table-panel">
          <div class="panel-heading"><div><h2>기업</h2><p>기업과 담당자 정보입니다.</p></div></div>
          ${renderCompanyTable()}
        </section>
        <section class="table-panel">
          <div class="panel-heading"><div><h2>과제</h2><p>등록된 산업 과제입니다.</p></div></div>
          ${renderChallengeTable()}
        </section>
        <section class="table-panel">
          <div class="panel-heading"><div><h2>지원·참여 요청</h2><p>양방향 매칭 흐름의 상태값입니다.</p></div></div>
          ${renderFlowTable()}
        </section>
      </div>
    </section>
  `;
}

function renderTaskCard(challenge, match, context) {
  const company = companyById(challenge.companyId);
  const appItem = applicationFor(challenge.id);
  return `
    <article class="task-card">
      <div class="task-card-head">
        <div>
          <span class="company">${escapeHtml(company.name)} · ${escapeHtml(challenge.field)}</span>
          <h3>${escapeHtml(challenge.title)}</h3>
          <p>${escapeHtml(challenge.description)}</p>
        </div>
        <div class="score-box">
          <div class="score-ring" style="--score: ${match.score}">${match.score}</div>
          <small>매칭 점수<br />${match.matchedSkills.length}개 기술 일치</small>
        </div>
      </div>
      <div class="task-meta">
        <span><b>기간</b>${escapeHtml(challenge.duration)}</span>
        <span><b>인원</b>${escapeHtml(challenge.seats)}명</span>
        <span><b>결과물</b>${escapeHtml(challenge.deliverable)}</span>
        <span><b>혜택</b>${escapeHtml(challenge.benefits)}</span>
      </div>
      <div class="tag-row">${formatTags(challenge.requiredSkills)}</div>
      <div class="inline-actions">
        <button class="link-button" type="button" data-route="task-detail:${challenge.id}">상세 보기</button>
        ${
          appItem
            ? `<span class="status ${appItem.status}">${statusLabel(appItem.status)}</span>`
            : `<button class="primary-button" type="button" data-action="apply" data-id="${challenge.id}">과제 지원</button>`
        }
        ${context === "tasks" ? `<span class="score-pill ${scoreClass(match.score)}">추천 ${match.score}점</span>` : ""}
      </div>
    </article>
  `;
}

function renderProfileCard(participant, challenge, match) {
  const request = invitationFor(challenge.id, participant.id);
  return `
    <article class="profile-card">
      <div class="task-card-head">
        <div>
          <h3>${escapeHtml(participant.name)}</h3>
          <p>${escapeHtml(participant.major)} · ${escapeHtml(participant.projects)}</p>
        </div>
        <span class="score-pill ${scoreClass(match.score)}">${match.score}점</span>
      </div>
      <div class="tag-row">${formatTags(participant.skills)}</div>
      <div class="inline-actions">
        ${
          request
            ? `<span class="status ${request.status}">${statusLabel(request.status)}</span>`
            : `<button class="primary-button" type="button" data-action="invite" data-challenge="${challenge.id}" data-participant="${participant.id}">참여 요청</button>`
        }
        <span class="tag amber">${escapeHtml(challenge.title)}</span>
      </div>
    </article>
  `;
}

function renderCompanyChallengeBlock(challenge) {
  const applications = state.applications.filter((item) => item.challengeId === challenge.id);
  return `
    <article class="panel">
      <div class="panel-heading">
        <div>
          <h3>${escapeHtml(challenge.title)}</h3>
          <p>${escapeHtml(challenge.field)} · ${escapeHtml(challenge.duration)} · ${escapeHtml(challenge.seats)}명 모집</p>
        </div>
        <span class="tag">${applications.length}명 지원</span>
      </div>
      ${renderApplicationTable(applications, "company")}
    </article>
  `;
}

function renderApplicationTable(applications, context) {
  if (!applications.length) return `<div class="empty">표시할 지원 내역이 없습니다.</div>`;
  return `
    <div class="table-scroll">
      <table>
        <thead>
          <tr>
            <th>과제</th>
            <th>참여자</th>
            <th>매칭</th>
            <th>상태</th>
            <th>일자</th>
            ${context === "company" ? "<th>관리</th>" : ""}
          </tr>
        </thead>
        <tbody>
          ${applications
            .map((item) => {
              const challenge = challengeById(item.challengeId);
              const participant = participantById(item.participantId);
              const match = calculateMatch(participant, challenge);
              return `
                <tr>
                  <td>${escapeHtml(challenge.title)}<br /><span class="tag">${escapeHtml(companyById(challenge.companyId).name)}</span></td>
                  <td>${escapeHtml(participant.name)}<br />${escapeHtml(participant.email)}</td>
                  <td><span class="score-pill ${scoreClass(match.score)}">${match.score}점</span></td>
                  <td>${statusChip(item.status)}</td>
                  <td>${escapeHtml(item.createdAt)}</td>
                  ${
                    context === "company"
                      ? `<td>
                          <div class="inline-actions">
                            <button class="small-button" type="button" data-action="application-status" data-id="${item.id}" data-status="accepted">수락</button>
                            <button class="small-button" type="button" data-action="application-status" data-id="${item.id}" data-status="rejected">거절</button>
                          </div>
                        </td>`
                      : ""
                  }
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderInvitationTable(invitations, context) {
  if (!invitations.length) return `<div class="empty">표시할 참여 요청이 없습니다.</div>`;
  return `
    <div class="table-scroll">
      <table>
        <thead>
          <tr>
            <th>과제</th>
            <th>기업</th>
            <th>참여자</th>
            <th>상태</th>
            <th>일자</th>
            ${context === "participant" ? "<th>응답</th>" : ""}
          </tr>
        </thead>
        <tbody>
          ${invitations
            .map((item) => {
              const challenge = challengeById(item.challengeId);
              const company = companyById(item.companyId);
              const participant = participantById(item.participantId);
              return `
                <tr>
                  <td>${escapeHtml(challenge.title)}</td>
                  <td>${escapeHtml(company.name)}<br />${escapeHtml(company.manager)}</td>
                  <td>${escapeHtml(participant.name)}</td>
                  <td>${statusChip(item.status)}</td>
                  <td>${escapeHtml(item.createdAt)}</td>
                  ${
                    context === "participant"
                      ? `<td>
                          <div class="inline-actions">
                            <button class="small-button" type="button" data-action="invitation-status" data-id="${item.id}" data-status="accepted">수락</button>
                            <button class="small-button" type="button" data-action="invitation-status" data-id="${item.id}" data-status="rejected">거절</button>
                          </div>
                        </td>`
                      : ""
                  }
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderParticipantTable() {
  return `
    <div class="table-scroll">
      <table>
        <thead><tr><th>이름</th><th>전공</th><th>기술</th><th>관심 분야</th></tr></thead>
        <tbody>
          ${state.participants
            .map(
              (participant) => `
                <tr>
                  <td>${escapeHtml(participant.name)}<br />${escapeHtml(participant.email)}</td>
                  <td>${escapeHtml(participant.major)}</td>
                  <td>${escapeHtml(participant.skills.join(", "))}</td>
                  <td>${escapeHtml(participant.interests.join(", "))}</td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderCompanyTable() {
  return `
    <div class="table-scroll">
      <table>
        <thead><tr><th>기업</th><th>담당자</th><th>분야</th><th>등록 과제</th></tr></thead>
        <tbody>
          ${state.companies
            .map(
              (company) => `
                <tr>
                  <td>${escapeHtml(company.name)}</td>
                  <td>${escapeHtml(company.manager)}<br />${escapeHtml(company.email)}</td>
                  <td>${escapeHtml(company.field)}</td>
                  <td>${state.challenges.filter((challenge) => challenge.companyId === company.id).length}</td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderChallengeTable() {
  return `
    <div class="table-scroll">
      <table>
        <thead><tr><th>과제</th><th>기업</th><th>분야</th><th>필요 기술</th></tr></thead>
        <tbody>
          ${state.challenges
            .map(
              (challenge) => `
                <tr>
                  <td>${escapeHtml(challenge.title)}</td>
                  <td>${escapeHtml(companyById(challenge.companyId).name)}</td>
                  <td>${escapeHtml(challenge.field)}</td>
                  <td>${escapeHtml(challenge.requiredSkills.join(", "))}</td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderFlowTable() {
  const rows = [
    ...state.applications.map((item) => ({ ...item, type: "참여자 지원" })),
    ...state.invitations.map((item) => ({ ...item, type: "기업 요청" })),
  ];
  return `
    <div class="table-scroll">
      <table>
        <thead><tr><th>유형</th><th>과제</th><th>참여자</th><th>상태</th></tr></thead>
        <tbody>
          ${rows
            .map(
              (item) => `
                <tr>
                  <td>${escapeHtml(item.type)}</td>
                  <td>${escapeHtml(challengeById(item.challengeId).title)}</td>
                  <td>${escapeHtml(participantById(item.participantId).name)}</td>
                  <td>${statusChip(item.status)}</td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function applyToChallenge(challengeId) {
  if (applicationFor(challengeId)) {
    showToast("이미 지원한 과제입니다.");
    return;
  }
  state.applications.unshift({
    id: `a-${Date.now()}`,
    challengeId,
    participantId: "p-user",
    status: "pending",
    createdAt: today(),
  });
  saveState();
  showToast("과제 지원이 접수되었습니다.");
  render();
}

function inviteParticipant(challengeId, participantId) {
  const challenge = challengeById(challengeId);
  if (invitationFor(challengeId, participantId)) {
    showToast("이미 보낸 참여 요청입니다.");
    return;
  }
  state.invitations.unshift({
    id: `r-${Date.now()}`,
    challengeId,
    companyId: challenge.companyId,
    participantId,
    status: "pending",
    createdAt: today(),
  });
  saveState();
  showToast("참여 요청을 보냈습니다.");
  render();
}

function updateStatus(collection, id, status) {
  const item = state[collection].find((entry) => entry.id === id);
  if (!item) return;
  item.status = status;
  saveState();
  showToast(`상태가 '${statusLabel(status)}'으로 변경되었습니다.`);
  render();
}

function resetDemo() {
  state = structuredClone(seedData);
  saveState();
  showToast("데모 데이터가 초기화되었습니다.");
  render();
}

function handleAppClick(event) {
  const routeButton = event.target.closest("[data-route]");
  if (routeButton) {
    navigate(routeButton.dataset.route);
    return;
  }

  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;
  const { action, id, status, challenge, participant } = actionButton.dataset;

  if (action === "apply") applyToChallenge(id);
  if (action === "invite") inviteParticipant(challenge, participant);
  if (action === "application-status") updateStatus("applications", id, status);
  if (action === "invitation-status") updateStatus("invitations", id, status);
  if (action === "reset-demo") resetDemo();
}

function render() {
  const route = getRoute();
  const [name, param] = route.split(":");
  setActiveNav(name);
  if (name === "home") renderHome();
  else if (name === "participant") renderParticipantDashboard();
  else if (name === "profile") renderProfileForm();
  else if (name === "company") renderCompanyDashboard();
  else if (name === "task-new") renderTaskForm();
  else if (name === "tasks") renderTasks();
  else if (name === "task-detail") renderTaskDetail(param);
  else if (name === "admin") renderAdmin();
  else renderHome();
  window.scrollTo(0, 0);
}

document.addEventListener("click", handleAppClick);
window.addEventListener("hashchange", render);
render();
