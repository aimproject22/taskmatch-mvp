const STORAGE_KEY = "taskjob-board-mvp-v1";

const seed = {
  participant: {
    id: "p-me",
    name: "김민준",
    email: "minjun@example.com",
    major: "컴퓨터공학",
    skills: ["Python", "React", "SQL", "TensorFlow"],
    interests: ["AI", "데이터", "HR Tech"],
    projects: "제조 불량 탐지 모델, 채용 플랫폼 웹앱, 데이터 시각화 대시보드",
    portfolio: "https://portfolio.example.com/minjun",
    fileName: "",
  },
  participants: [
    {
      id: "p-me",
      name: "김민준",
      email: "minjun@example.com",
      major: "컴퓨터공학",
      skills: ["Python", "React", "SQL", "TensorFlow"],
      interests: ["AI", "데이터", "HR Tech"],
      projects: "제조 불량 탐지 모델, 채용 플랫폼 웹앱, 데이터 시각화 대시보드",
      portfolio: "https://portfolio.example.com/minjun",
      fileName: "",
    },
    {
      id: "p-ux",
      name: "이서연",
      email: "seoyeon@example.com",
      major: "산업디자인",
      skills: ["Figma", "UX 리서치", "서비스기획", "Notion"],
      interests: ["SaaS", "교육", "HR"],
      projects: "B2B 온보딩 UX 개선, 고객 인터뷰 리포트, 디자인 시스템",
      portfolio: "https://portfolio.example.com/seoyeon",
      fileName: "",
    },
    {
      id: "p-data",
      name: "최하린",
      email: "harin@example.com",
      major: "통계학",
      skills: ["Python", "SQL", "Tableau", "데이터 분석"],
      interests: ["HR", "마케팅", "헬스케어"],
      projects: "채용 전환율 분석, CRM 세그먼트 모델링, 실험 결과 리포트",
      portfolio: "https://portfolio.example.com/harin",
      fileName: "",
    },
    {
      id: "p-iot",
      name: "박지훈",
      email: "jihoon@example.com",
      major: "기계공학",
      skills: ["Python", "IoT", "Arduino", "데이터 분석"],
      interests: ["제조", "스마트팩토리", "물류"],
      projects: "설비 센서 수집, 공정 이상 탐지, 물류 라우팅 시뮬레이션",
      portfolio: "https://portfolio.example.com/jihoon",
      fileName: "",
    },
  ],
  companies: [
    {
      id: "c-me",
      name: "커리어브릿지랩",
      manager: "정다은",
      email: "daeun@careerbridge.example",
      field: "HR Tech",
      description: "기업 과제 운영과 채용 전환을 연결하는 HR SaaS 스타트업",
    },
    {
      id: "c-factory",
      name: "네오팩토리",
      manager: "오승현",
      email: "sh.oh@neofactory.example",
      field: "스마트팩토리",
      description: "제조 현장 데이터와 AI 검사 자동화를 개발하는 기업",
    },
    {
      id: "c-care",
      name: "케어링크",
      manager: "문지아",
      email: "jia@carelink.example",
      field: "헬스케어",
      description: "디지털 헬스케어 서비스의 데이터 기반 운영을 지원합니다.",
    },
  ],
  postings: [
    {
      id: "j-1",
      companyId: "c-factory",
      title: "AI 불량 유형 분류 모델 구축",
      category: "AI/제조",
      location: "서울·원격",
      workType: "하이브리드",
      period: "6주",
      seats: 4,
      deadline: "D-12",
      reward: "과제비 80만원",
      badges: ["추천", "채용연계"],
      requiredSkills: ["Python", "TensorFlow", "Computer Vision", "데이터 분석"],
      deliverable: "모델 노트북, 성능 리포트, 적용 시나리오",
      benefits: "현업 멘토링, 우수팀 인턴십 검토, 장비 데이터 샘플 제공",
      description:
        "제조 이미지 샘플과 공정 로그를 활용해 불량 유형을 분류하는 초기 모델과 운영 리포트를 만듭니다.",
    },
    {
      id: "j-2",
      companyId: "c-me",
      title: "HR 온보딩 데이터 대시보드",
      category: "HR/데이터",
      location: "서울 강남",
      workType: "원격가능",
      period: "5주",
      seats: 2,
      deadline: "D-7",
      reward: "과제비 60만원",
      badges: ["급구", "포트폴리오"],
      requiredSkills: ["React", "SQL", "Tableau", "데이터 분석"],
      deliverable: "웹 대시보드, KPI 정의서, 분석 리포트",
      benefits: "실무 데이터 경험, 포트폴리오 리뷰, 채용 연계 인터뷰",
      description:
        "신규 입사자 온보딩 데이터를 분석하고 기업 담당자가 바로 볼 수 있는 대시보드를 구현합니다.",
    },
    {
      id: "j-3",
      companyId: "c-me",
      title: "B2B SaaS 과제 운영 UX 개선",
      category: "서비스기획/UX",
      location: "경기 판교",
      workType: "원격가능",
      period: "3주",
      seats: 2,
      deadline: "D-5",
      reward: "과제비 45만원",
      badges: ["급구", "신입가능"],
      requiredSkills: ["Figma", "UX 리서치", "서비스기획", "Notion"],
      deliverable: "사용자 여정 맵, 와이어프레임, 개선 백로그",
      benefits: "프로덕트 멘토링, 디자인 리뷰, 포트폴리오 피드백",
      description:
        "기업 담당자와 참여자 인터뷰를 기반으로 공고 등록, 지원자 검토, 요청 발송 흐름을 개선합니다.",
    },
    {
      id: "j-4",
      companyId: "c-care",
      title: "디지털 헬스케어 고객 이탈 예측",
      category: "헬스케어/데이터",
      location: "부산·원격",
      workType: "원격",
      period: "4주",
      seats: 3,
      deadline: "D-18",
      reward: "과제비 70만원",
      badges: ["데이터", "우수자추천"],
      requiredSkills: ["Python", "SQL", "통계", "데이터 분석"],
      deliverable: "예측 모델, 세그먼트 리포트, 개선 실험 제안",
      benefits: "데이터 멘토링, 우수자 과제비, 실무 추천서",
      description:
        "서비스 이용 로그와 설문 데이터를 바탕으로 이탈 가능성이 높은 고객군을 찾고 개선 액션을 제안합니다.",
    },
    {
      id: "j-5",
      companyId: "c-factory",
      title: "스마트 물류 경로 최적화 PoC",
      category: "물류/제조",
      location: "인천 송도",
      workType: "하이브리드",
      period: "6주",
      seats: 3,
      deadline: "D-20",
      reward: "과제비 75만원",
      badges: ["현장데이터", "멘토링"],
      requiredSkills: ["Python", "알고리즘", "IoT", "데이터 분석"],
      deliverable: "최적화 알고리즘, 시뮬레이션 결과, 적용 가이드",
      benefits: "현장 데이터 샘플, 기술 멘토링, 산학협력 인증",
      description:
        "배송 지점과 시간 제약 조건을 기반으로 물류 동선을 최적화하는 알고리즘 PoC를 수행합니다.",
    },
  ],
  applications: [
    { id: "a-1", postingId: "j-2", participantId: "p-me", status: "pending", date: "2026-06-12" },
    { id: "a-2", postingId: "j-1", participantId: "p-data", status: "accepted", date: "2026-06-10" },
    { id: "a-3", postingId: "j-3", participantId: "p-ux", status: "pending", date: "2026-06-14" },
  ],
  invites: [
    { id: "i-1", postingId: "j-1", companyId: "c-factory", participantId: "p-me", status: "pending", date: "2026-06-13" },
    { id: "i-2", postingId: "j-3", companyId: "c-me", participantId: "p-ux", status: "accepted", date: "2026-06-11" },
  ],
};

let data = load();
const app = document.querySelector("#app");
let toastTimer;

function load() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(seed);
  try {
    const parsed = JSON.parse(saved);
    return { ...structuredClone(seed), ...parsed };
  } catch {
    return structuredClone(seed);
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function esc(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function list(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  return String(value || "")
    .split(/[,/\n|]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function norm(value) {
  return String(value || "").trim().toLowerCase();
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function me() {
  return data.participants.find((p) => p.id === "p-me") || data.participant;
}

function company(id) {
  return data.companies.find((item) => item.id === id) || data.companies[0];
}

function posting(id) {
  return data.postings.find((item) => item.id === id) || data.postings[0];
}

function participant(id) {
  return data.participants.find((item) => item.id === id) || me();
}

function appFor(postingId, participantId = "p-me") {
  return data.applications.find((item) => item.postingId === postingId && item.participantId === participantId);
}

function inviteFor(postingId, participantId) {
  return data.invites.find((item) => item.postingId === postingId && item.participantId === participantId);
}

function related(value) {
  const base = norm(value);
  const map = {
    ai: ["인공지능", "머신러닝", "tensorflow", "python", "데이터"],
    "ai/제조": ["제조", "스마트팩토리", "불량", "computer vision", "python"],
    "hr/데이터": ["hr", "채용", "온보딩", "데이터", "sql", "tableau"],
    "서비스기획/ux": ["ux", "figma", "리서치", "서비스기획", "notion"],
    "헬스케어/데이터": ["헬스케어", "통계", "데이터", "sql", "python"],
    "물류/제조": ["물류", "제조", "iot", "알고리즘", "python"],
    데이터: ["data", "sql", "tableau", "분석", "통계"],
    제조: ["스마트팩토리", "공정", "iot", "불량"],
    hr: ["채용", "온보딩", "인재"],
  };
  return [base, ...(map[base] || [])].map(norm);
}

function hasRelated(source, target) {
  const text = norm(Array.isArray(source) ? source.join(" ") : source);
  return related(target).some((term) => text.includes(term));
}

function matchScore(person, job) {
  const skills = list(person.skills).map(norm);
  const required = list(job.requiredSkills);
  const matched = required.filter((skill) => skills.includes(norm(skill)) || hasRelated(person.skills, skill));
  const skillScore = required.length ? (matched.length / required.length) * 48 : 0;
  const interestScore = hasRelated([...list(person.interests), person.major], job.category) ? 24 : 0;
  const projectText = `${person.projects} ${list(person.skills).join(" ")} ${list(person.interests).join(" ")}`;
  const projectHits = required.filter((skill) => hasRelated(projectText, skill)).length;
  const projectScore = Math.min(18, projectHits * 4 + (hasRelated(projectText, job.category) ? 5 : 0));
  const majorScore = hasRelated(person.major, job.category) ? 10 : 0;
  const score = Math.min(100, Math.round(skillScore + interestScore + projectScore + majorScore));
  return {
    score,
    matched,
    breakdown: {
      "기술": Math.round(skillScore),
      "관심": Math.round(interestScore),
      "프로젝트": Math.round(projectScore),
      "전공": Math.round(majorScore),
    },
  };
}

function scoreTone(score) {
  if (score >= 72) return "";
  if (score >= 50) return "mid";
  return "low";
}

function statusText(status) {
  return { pending: "대기중", accepted: "수락됨", rejected: "거절됨" }[status] || status;
}

function chips(items, type = "") {
  return list(items).map((item) => `<span class="chip ${type}">${esc(item)}</span>`).join("");
}

function routeTo(route) {
  location.hash = route;
}

function route() {
  return location.hash.replace("#", "") || "home";
}

function activeNav(current) {
  document.querySelectorAll("[data-route]").forEach((button) => {
    const target = button.dataset.route;
    button.classList.toggle("active", target === current || (current.startsWith("job-detail") && target === "jobs"));
  });
}

function toast(message) {
  let el = document.querySelector(".toast");
  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("visible"), 2500);
}

function renderHome() {
  const recommended = sortedPostings().slice(0, 3);
  app.innerHTML = `
    <section class="hero-board">
      <div class="hero-inner">
        <div class="hero-copy">
          <span class="kicker">PROJECT JOB BOARD MVP</span>
          <h1>알바 공고처럼 쉽게 찾는 기업 실전 과제</h1>
          <p>지역, 분야, 기간, 기술스택으로 과제 공고를 검색하고 참여자는 바로 지원합니다. 기업은 공고를 등록하고 지원자와 추천 인재에게 참여 요청을 보낼 수 있습니다.</p>
          <div class="button-row" style="margin-top: 26px">
            <button class="primary" type="button" data-route="jobs">과제공고 보기</button>
            <button class="secondary" type="button" data-route="resume">이력서 등록</button>
            <button class="secondary" type="button" data-route="company">기업센터</button>
          </div>
        </div>
      </div>
    </section>

    ${renderSearchPanel()}

    <section class="section">
      <div class="heading">
        <div>
          <h2>오늘의 추천 과제</h2>
          <p>현재 이력서 기준 매칭 점수가 높은 공고입니다.</p>
        </div>
        <button class="secondary" type="button" data-route="jobs">전체 공고</button>
      </div>
      <div>
        ${recommended.map((item) => postingCard(item.job, item.match)).join("")}
      </div>
    </section>

    <section class="section" style="padding-top: 0">
      <div class="stat-grid">
        <div class="stat"><strong>${data.postings.length}</strong><span>등록 과제 공고</span></div>
        <div class="stat"><strong>${data.participants.length}</strong><span>인재 프로필</span></div>
        <div class="stat"><strong>${data.applications.length}</strong><span>지원 내역</span></div>
        <div class="stat"><strong>${data.invites.length}</strong><span>기업 요청</span></div>
      </div>
    </section>
  `;
}

function renderSearchPanel() {
  const categories = [...new Set(data.postings.map((item) => item.category))];
  const locations = [...new Set(data.postings.map((item) => item.location))];
  return `
    <section class="search-panel" aria-label="과제 공고 검색">
      <div class="search-grid">
        <input id="heroKeyword" placeholder="과제명, 기업명, 기술스택 검색" />
        <select id="heroCategory">
          <option value="">전체 분야</option>
          ${categories.map((item) => `<option value="${esc(item)}">${esc(item)}</option>`).join("")}
        </select>
        <select id="heroLocation">
          <option value="">전체 지역</option>
          ${locations.map((item) => `<option value="${esc(item)}">${esc(item)}</option>`).join("")}
        </select>
        <button class="primary" type="button" data-action="search-home">공고 검색</button>
      </div>
      <div class="quick-tags">
        <button class="tiny" type="button" data-action="quick-search" data-keyword="Python">Python</button>
        <button class="tiny" type="button" data-action="quick-search" data-keyword="React">React</button>
        <button class="tiny" type="button" data-action="quick-search" data-keyword="UX">UX</button>
        <button class="tiny" type="button" data-action="quick-search" data-keyword="데이터">데이터</button>
      </div>
    </section>
  `;
}

function sortedPostings() {
  return data.postings
    .map((job) => ({ job, match: matchScore(me(), job) }))
    .sort((a, b) => b.match.score - a.match.score);
}

function postingCard(job, match) {
  const c = company(job.companyId);
  const applied = appFor(job.id);
  return `
    <article class="posting">
      <div class="posting-head">
        <div>
          <div class="company-line">
            <span>${esc(c.name)}</span>
            <span>${esc(job.location)}</span>
            <span>${esc(job.deadline)}</span>
          </div>
          <h3>${esc(job.title)}</h3>
          <p>${esc(job.description)}</p>
        </div>
        <div class="salary">${esc(job.reward)}</div>
      </div>
      <div class="meta-grid">
        <span><b>분야</b>${esc(job.category)}</span>
        <span><b>근무방식</b>${esc(job.workType)}</span>
        <span><b>기간</b>${esc(job.period)}</span>
        <span><b>모집</b>${esc(job.seats)}명</span>
      </div>
      <div class="quick-tags">
        ${job.badges.map((badge) => `<span class="chip hot">${esc(badge)}</span>`).join("")}
        ${chips(job.requiredSkills, "blue")}
      </div>
      <div class="actions">
        <span class="score ${scoreTone(match.score)}">매칭 ${match.score}점</span>
        <button class="secondary" type="button" data-route="job-detail:${job.id}">상세보기</button>
        ${
          applied
            ? `<span class="status ${applied.status}">${statusText(applied.status)}</span>`
            : `<button class="primary" type="button" data-action="apply" data-id="${job.id}">즉시지원</button>`
        }
      </div>
    </article>
  `;
}

function renderJobs() {
  const categories = [...new Set(data.postings.map((item) => item.category))];
  const locations = [...new Set(data.postings.map((item) => item.location))];
  app.innerHTML = `
    <section class="page">
      <div class="heading">
        <div>
          <span class="kicker" style="color: var(--teal-dark)">PROJECT POSTINGS</span>
          <h1>과제공고</h1>
          <p>공고형 플랫폼처럼 조건을 고르고, 매칭 점수를 확인한 뒤 바로 지원합니다.</p>
        </div>
        <button class="primary" type="button" data-route="post-new">기업 공고등록</button>
      </div>

      <div class="board-layout">
        <aside class="panel">
          <h2>상세 조건</h2>
          <p>검색 조건은 즉시 공고 목록에 반영됩니다.</p>
          <div class="filter-stack" style="margin-top: 16px">
            <div class="field">
              <label for="keyword">키워드</label>
              <input id="keyword" value="${esc(sessionStorage.getItem("jobKeyword") || "")}" placeholder="기업명, 과제명, 기술" />
            </div>
            <div class="field">
              <label for="category">분야</label>
              <select id="category">
                <option value="">전체</option>
                ${categories.map((item) => `<option value="${esc(item)}">${esc(item)}</option>`).join("")}
              </select>
            </div>
            <div class="field">
              <label for="location">지역</label>
              <select id="location">
                <option value="">전체</option>
                ${locations.map((item) => `<option value="${esc(item)}">${esc(item)}</option>`).join("")}
              </select>
            </div>
            <div class="field">
              <label for="minScore">추천 점수</label>
              <select id="minScore">
                <option value="0">전체</option>
                <option value="50">50점 이상</option>
                <option value="70">70점 이상</option>
              </select>
            </div>
          </div>
        </aside>

        <section>
          <div id="jobList"></div>
        </section>

        <aside class="right-rail">
          <div class="panel">
            <h2>내 이력서 매칭</h2>
            <p>${esc(me().name)} · ${esc(me().major)}</p>
            <div class="quick-tags">${chips(me().skills)}</div>
            <div class="button-row" style="margin-top: 16px">
              <button class="secondary" type="button" data-route="resume">이력서 수정</button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  `;

  const category = document.querySelector("#category");
  const location = document.querySelector("#location");
  const keyword = document.querySelector("#keyword");
  const minScore = document.querySelector("#minScore");
  category.value = sessionStorage.getItem("jobCategory") || "";
  location.value = sessionStorage.getItem("jobLocation") || "";
  minScore.value = sessionStorage.getItem("jobMinScore") || "0";

  const filter = () => {
    sessionStorage.setItem("jobKeyword", keyword.value);
    sessionStorage.setItem("jobCategory", category.value);
    sessionStorage.setItem("jobLocation", location.value);
    sessionStorage.setItem("jobMinScore", minScore.value);
    const q = norm(keyword.value);
    const items = sortedPostings()
      .filter(({ job, match }) => {
        const c = company(job.companyId);
        const text = norm(`${job.title} ${job.description} ${job.requiredSkills.join(" ")} ${c.name} ${job.badges.join(" ")}`);
        return (
          (!q || text.includes(q)) &&
          (!category.value || job.category === category.value) &&
          (!location.value || job.location === location.value) &&
          match.score >= Number(minScore.value)
        );
      })
      .map(({ job, match }) => postingCard(job, match))
      .join("");
    document.querySelector("#jobList").innerHTML = items || `<div class="empty">조건에 맞는 과제공고가 없습니다.</div>`;
  };

  keyword.addEventListener("input", filter);
  category.addEventListener("change", filter);
  location.addEventListener("change", filter);
  minScore.addEventListener("change", filter);
  filter();
}

function renderDetail(id) {
  const job = posting(id);
  const c = company(job.companyId);
  const match = matchScore(me(), job);
  const applied = appFor(job.id);
  const max = { "기술": 48, "관심": 24, "프로젝트": 18, "전공": 10 };
  app.innerHTML = `
    <section class="page">
      <div class="heading">
        <div>
          <span class="kicker" style="color: var(--teal-dark)">POSTING DETAIL</span>
          <h1>과제공고 상세</h1>
          <p>공고 조건, 제출 결과물, 기업 정보, 내 매칭 근거를 확인합니다.</p>
        </div>
        <button class="secondary" type="button" data-route="jobs">목록으로</button>
      </div>

      <div class="detail-grid">
        <article>
          <div class="detail-main">
            <span class="score ${scoreTone(match.score)}">매칭 ${match.score}점</span>
            <h1>${esc(job.title)}</h1>
            <p>${esc(job.description)}</p>
          </div>

          <section class="panel">
            <h2>공고 조건</h2>
            <div class="meta-grid" style="margin-top: 14px">
              <span><b>기업</b>${esc(c.name)}</span>
              <span><b>지역</b>${esc(job.location)}</span>
              <span><b>근무방식</b>${esc(job.workType)}</span>
              <span><b>마감</b>${esc(job.deadline)}</span>
              <span><b>기간</b>${esc(job.period)}</span>
              <span><b>모집</b>${esc(job.seats)}명</span>
              <span><b>보상</b>${esc(job.reward)}</span>
              <span><b>분야</b>${esc(job.category)}</span>
            </div>
            <div class="quick-tags">${chips(job.requiredSkills, "blue")}</div>
          </section>

          <section class="panel">
            <h2>제출 결과물과 혜택</h2>
            <p><strong>제출 결과물:</strong> ${esc(job.deliverable)}</p>
            <p><strong>제공 혜택:</strong> ${esc(job.benefits)}</p>
          </section>

          <section class="panel">
            <h2>기업 정보</h2>
            <p>${esc(c.description)}</p>
            <div class="meta-grid" style="margin-top: 14px">
              <span><b>담당자</b>${esc(c.manager)}</span>
              <span><b>이메일</b>${esc(c.email)}</span>
              <span><b>기업 분야</b>${esc(c.field)}</span>
              <span><b>등록 공고</b>${data.postings.filter((item) => item.companyId === c.id).length}건</span>
            </div>
          </section>
        </article>

        <aside class="panel">
          <h2>내 매칭 분석</h2>
          <div class="score-box" style="margin-top: 14px">
            <div class="score-ring" style="--score: ${match.score}">${match.score}</div>
            <p>일치 기술 ${match.matched.length}개<br />${esc(match.matched.join(", ") || "직접 일치 없음")}</p>
          </div>
          <div class="bar-list">
            ${Object.entries(match.breakdown)
              .map(
                ([label, value]) => `
                  <div class="bar-row">
                    <strong>${esc(label)}</strong>
                    <div class="bar"><span style="--value: ${Math.round((value / max[label]) * 100)}%"></span></div>
                    <span>${value}</span>
                  </div>
                `,
              )
              .join("")}
          </div>
          <div class="button-row" style="margin-top: 18px">
            ${
              applied
                ? `<span class="status ${applied.status}">${statusText(applied.status)}</span>`
                : `<button class="primary" type="button" data-action="apply" data-id="${job.id}">즉시지원</button>`
            }
            <button class="secondary" type="button" data-route="resume">이력서 보기</button>
          </div>
        </aside>
      </div>
    </section>
  `;
}

function renderResume() {
  const person = me();
  app.innerHTML = `
    <section class="page">
      <div class="heading">
        <div>
          <span class="kicker" style="color: var(--teal-dark)">RESUME</span>
          <h1>참여자 이력서 등록</h1>
          <p>공고 추천과 기업 참여 요청에 쓰이는 기본 프로필입니다.</p>
        </div>
        <button class="secondary" type="button" data-route="jobs">맞춤 공고 보기</button>
      </div>

      <form class="panel form-grid" id="resumeForm">
        <div class="field">
          <label for="name">이름</label>
          <input id="name" name="name" value="${esc(person.name)}" required />
        </div>
        <div class="field">
          <label for="email">이메일</label>
          <input id="email" name="email" type="email" value="${esc(person.email)}" required />
        </div>
        <div class="field">
          <label for="major">전공</label>
          <input id="major" name="major" value="${esc(person.major)}" required />
        </div>
        <div class="field">
          <label for="skills">기술스택</label>
          <input id="skills" name="skills" value="${esc(person.skills.join(", "))}" required />
        </div>
        <div class="field full">
          <label for="interests">관심 분야</label>
          <input id="interests" name="interests" value="${esc(person.interests.join(", "))}" required />
        </div>
        <div class="field full">
          <label for="projects">이전 프로젝트</label>
          <textarea id="projects" name="projects" required>${esc(person.projects)}</textarea>
        </div>
        <div class="field">
          <label for="portfolio">포트폴리오 링크</label>
          <input id="portfolio" name="portfolio" value="${esc(person.portfolio)}" />
        </div>
        <div class="field">
          <label for="portfolioFile">포트폴리오 파일</label>
          <input id="portfolioFile" name="portfolioFile" type="file" />
        </div>
        <div class="field full">
          <div class="button-row">
            <button class="primary" type="submit">이력서 저장</button>
            <button class="secondary" type="button" data-route="jobs">취소</button>
          </div>
        </div>
      </form>

      <section class="table-panel">
        <h2>내 지원 및 기업 요청</h2>
        ${renderMyFlow()}
      </section>
    </section>
  `;

  document.querySelector("#resumeForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const file = document.querySelector("#portfolioFile").files[0];
    Object.assign(person, {
      name: form.get("name").trim(),
      email: form.get("email").trim(),
      major: form.get("major").trim(),
      skills: list(form.get("skills")),
      interests: list(form.get("interests")),
      projects: form.get("projects").trim(),
      portfolio: form.get("portfolio").trim(),
      fileName: file?.name || person.fileName || "",
    });
    data.participant = { ...person };
    save();
    toast("이력서가 저장되었습니다.");
    routeTo("jobs");
  });
}

function renderMyFlow() {
  const rows = [
    ...data.applications.filter((item) => item.participantId === "p-me").map((item) => ({ ...item, type: "내 지원" })),
    ...data.invites.filter((item) => item.participantId === "p-me").map((item) => ({ ...item, type: "기업 요청" })),
  ];
  if (!rows.length) return `<div class="empty">아직 지원 또는 요청 내역이 없습니다.</div>`;
  return table(
    ["유형", "과제공고", "기업", "상태", "일자", "응답"],
    rows.map((item) => {
      const job = posting(item.postingId);
      return [
        esc(item.type),
        esc(job.title),
        esc(company(job.companyId).name),
        `<span class="status ${item.status}">${statusText(item.status)}</span>`,
        esc(item.date),
        item.type === "기업 요청"
          ? `<div class="button-row"><button class="tiny" type="button" data-action="invite-status" data-id="${item.id}" data-status="accepted">수락</button><button class="tiny" type="button" data-action="invite-status" data-id="${item.id}" data-status="rejected">거절</button></div>`
          : "",
      ];
    }),
  );
}

function renderCompany() {
  const c = company("c-me");
  const mine = data.postings.filter((item) => item.companyId === c.id);
  const first = mine[0] || data.postings[0];
  const people = data.participants
    .map((person) => ({ person, match: matchScore(person, first) }))
    .sort((a, b) => b.match.score - a.match.score)
    .slice(0, 4);
  app.innerHTML = `
    <section class="page">
      <div class="heading">
        <div>
          <span class="kicker" style="color: var(--teal-dark)">COMPANY CENTER</span>
          <h1>기업센터</h1>
          <p>공고 등록, 지원자 관리, 추천 인재 참여 요청을 처리합니다.</p>
        </div>
        <button class="primary" type="button" data-route="post-new">새 공고등록</button>
      </div>

      <div class="two-col">
        <form class="panel form-grid" id="companyForm">
          <div class="field full"><h2>기업 정보</h2></div>
          <div class="field">
            <label for="companyName">기업명</label>
            <input id="companyName" name="name" value="${esc(c.name)}" required />
          </div>
          <div class="field">
            <label for="manager">담당자</label>
            <input id="manager" name="manager" value="${esc(c.manager)}" required />
          </div>
          <div class="field">
            <label for="companyEmail">담당자 이메일</label>
            <input id="companyEmail" name="email" type="email" value="${esc(c.email)}" required />
          </div>
          <div class="field">
            <label for="companyField">기업 분야</label>
            <input id="companyField" name="field" value="${esc(c.field)}" required />
          </div>
          <div class="field full">
            <label for="description">기업 소개</label>
            <textarea id="description" name="description" required>${esc(c.description)}</textarea>
          </div>
          <div class="field full"><button class="primary" type="submit">기업 정보 저장</button></div>
        </form>

        <section class="panel">
          <h2>추천 인재</h2>
          <p>선택 공고 기준 매칭 점수가 높은 참여자입니다.</p>
          <div class="field" style="margin-top: 14px">
            <label for="recommendJob">추천 기준 공고</label>
            <select id="recommendJob">
              ${mine.map((job) => `<option value="${job.id}">${esc(job.title)}</option>`).join("")}
            </select>
          </div>
          <div id="peopleList" style="margin-top: 14px">
            ${people.map(({ person, match }) => personCard(person, first, match)).join("")}
          </div>
        </section>
      </div>

      <section class="table-panel">
        <div class="heading" style="margin-bottom: 14px">
          <div><h2>내 공고와 지원자</h2><p>공고별 지원자를 확인하고 상태를 변경합니다.</p></div>
        </div>
        ${mine.map(companyPostingBlock).join("") || `<div class="empty">등록한 공고가 없습니다.</div>`}
      </section>

      <section class="table-panel">
        <h2>보낸 참여 요청</h2>
        ${renderInviteTable(data.invites.filter((item) => item.companyId === "c-me"), false)}
      </section>
    </section>
  `;

  document.querySelector("#companyForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    Object.assign(c, {
      name: form.get("name").trim(),
      manager: form.get("manager").trim(),
      email: form.get("email").trim(),
      field: form.get("field").trim(),
      description: form.get("description").trim(),
    });
    save();
    toast("기업 정보가 저장되었습니다.");
    render();
  });

  const select = document.querySelector("#recommendJob");
  select?.addEventListener("change", () => {
    const selected = posting(select.value);
    const html = data.participants
      .map((person) => ({ person, match: matchScore(person, selected) }))
      .sort((a, b) => b.match.score - a.match.score)
      .slice(0, 4)
      .map(({ person, match }) => personCard(person, selected, match))
      .join("");
    document.querySelector("#peopleList").innerHTML = html;
  });
}

function personCard(person, job, match) {
  const invited = inviteFor(job.id, person.id);
  return `
    <article class="profile-card">
      <div class="posting-head">
        <div>
          <h3>${esc(person.name)}</h3>
          <p>${esc(person.major)} · ${esc(person.projects)}</p>
        </div>
        <span class="score ${scoreTone(match.score)}">${match.score}점</span>
      </div>
      <div class="quick-tags">${chips(person.skills)}</div>
      <div class="actions">
        ${
          invited
            ? `<span class="status ${invited.status}">${statusText(invited.status)}</span>`
            : `<button class="primary" type="button" data-action="invite" data-posting="${job.id}" data-person="${person.id}">참여 요청</button>`
        }
        <span class="chip blue">${esc(job.title)}</span>
      </div>
    </article>
  `;
}

function companyPostingBlock(job) {
  const apps = data.applications.filter((item) => item.postingId === job.id);
  return `
    <article class="panel">
      <div class="posting-head">
        <div>
          <h3>${esc(job.title)}</h3>
          <p>${esc(job.category)} · ${esc(job.period)} · 지원자 ${apps.length}명</p>
        </div>
        <button class="secondary" type="button" data-route="job-detail:${job.id}">공고 보기</button>
      </div>
      ${renderApplicationTable(apps, true)}
    </article>
  `;
}

function renderPostForm() {
  app.innerHTML = `
    <section class="page">
      <div class="heading">
        <div>
          <span class="kicker" style="color: var(--teal-dark)">POST A PROJECT</span>
          <h1>기업 과제 공고등록</h1>
          <p>알바 공고처럼 조건을 명확히 적어 참여자가 바로 판단할 수 있게 합니다.</p>
        </div>
        <button class="secondary" type="button" data-route="company">기업센터</button>
      </div>

      <form class="panel form-grid" id="postForm">
        <div class="field">
          <label for="title">공고 제목</label>
          <input id="title" name="title" required placeholder="예: AI 고객 분류 모델 구축" />
        </div>
        <div class="field">
          <label for="category">분야</label>
          <input id="category" name="category" required placeholder="AI/데이터" />
        </div>
        <div class="field">
          <label for="location">지역</label>
          <input id="location" name="location" required placeholder="서울·원격" />
        </div>
        <div class="field">
          <label for="workType">근무방식</label>
          <input id="workType" name="workType" required placeholder="원격가능" />
        </div>
        <div class="field">
          <label for="period">수행 기간</label>
          <input id="period" name="period" required placeholder="4주" />
        </div>
        <div class="field">
          <label for="seats">모집 인원</label>
          <input id="seats" name="seats" type="number" min="1" value="3" required />
        </div>
        <div class="field">
          <label for="deadline">마감</label>
          <input id="deadline" name="deadline" required placeholder="D-10" />
        </div>
        <div class="field">
          <label for="reward">보상</label>
          <input id="reward" name="reward" required placeholder="과제비 60만원" />
        </div>
        <div class="field full">
          <label for="skills">필요 기술</label>
          <input id="skills" name="skills" required placeholder="Python, SQL, React" />
        </div>
        <div class="field full">
          <label for="description">과제 설명</label>
          <textarea id="description" name="description" required></textarea>
        </div>
        <div class="field">
          <label for="deliverable">제출 결과물</label>
          <input id="deliverable" name="deliverable" required placeholder="대시보드, 분석 리포트" />
        </div>
        <div class="field">
          <label for="benefits">제공 혜택</label>
          <input id="benefits" name="benefits" required placeholder="멘토링, 포트폴리오 인증" />
        </div>
        <div class="field full">
          <div class="button-row">
            <button class="primary" type="submit">공고 등록</button>
            <button class="secondary" type="button" data-route="company">취소</button>
          </div>
        </div>
      </form>
    </section>
  `;

  document.querySelector("#postForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    data.postings.unshift({
      id: `j-${Date.now()}`,
      companyId: "c-me",
      title: form.get("title").trim(),
      category: form.get("category").trim(),
      location: form.get("location").trim(),
      workType: form.get("workType").trim(),
      period: form.get("period").trim(),
      seats: Number(form.get("seats")),
      deadline: form.get("deadline").trim(),
      reward: form.get("reward").trim(),
      badges: ["신규", "채용연계"],
      requiredSkills: list(form.get("skills")),
      deliverable: form.get("deliverable").trim(),
      benefits: form.get("benefits").trim(),
      description: form.get("description").trim(),
    });
    save();
    toast("과제 공고가 등록되었습니다.");
    routeTo("company");
  });
}

function renderAdmin() {
  app.innerHTML = `
    <section class="page">
      <div class="heading">
        <div>
          <span class="kicker" style="color: var(--teal-dark)">ADMIN</span>
          <h1>관리자 대시보드</h1>
          <p>공고형 MVP의 참여자, 기업, 과제공고, 지원/요청 현황을 확인합니다.</p>
        </div>
        <button class="secondary" type="button" data-action="reset">데모 초기화</button>
      </div>
      <div class="stat-grid" style="margin-bottom: 16px">
        <div class="stat"><strong>${data.postings.length}</strong><span>과제공고</span></div>
        <div class="stat"><strong>${data.participants.length}</strong><span>참여자</span></div>
        <div class="stat"><strong>${data.companies.length}</strong><span>기업</span></div>
        <div class="stat"><strong>${data.applications.length + data.invites.length}</strong><span>지원·요청</span></div>
      </div>
      <div class="two-col">
        <section class="table-panel"><h2>과제공고</h2>${postingsTable()}</section>
        <section class="table-panel"><h2>참여자</h2>${participantsTable()}</section>
        <section class="table-panel"><h2>기업</h2>${companiesTable()}</section>
        <section class="table-panel"><h2>지원·요청</h2>${flowTable()}</section>
      </div>
    </section>
  `;
}

function table(headers, rows) {
  return `
    <div class="table-scroll">
      <table>
        <thead><tr>${headers.map((item) => `<th>${esc(item)}</th>`).join("")}</tr></thead>
        <tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
    </div>
  `;
}

function renderApplicationTable(apps, editable) {
  if (!apps.length) return `<div class="empty">지원자가 없습니다.</div>`;
  return table(
    ["참여자", "매칭", "상태", "일자", editable ? "관리" : ""].filter(Boolean),
    apps.map((item) => {
      const person = participant(item.participantId);
      const job = posting(item.postingId);
      const match = matchScore(person, job);
      const base = [
        `${esc(person.name)}<br />${esc(person.email)}`,
        `<span class="score ${scoreTone(match.score)}">${match.score}점</span>`,
        `<span class="status ${item.status}">${statusText(item.status)}</span>`,
        esc(item.date),
      ];
      if (editable) {
        base.push(`<div class="button-row"><button class="tiny" type="button" data-action="application-status" data-id="${item.id}" data-status="accepted">수락</button><button class="tiny" type="button" data-action="application-status" data-id="${item.id}" data-status="rejected">거절</button></div>`);
      }
      return base;
    }),
  );
}

function renderInviteTable(invites, participantCanReply) {
  if (!invites.length) return `<div class="empty">참여 요청 내역이 없습니다.</div>`;
  return table(
    ["과제", "기업", "참여자", "상태", "일자", participantCanReply ? "응답" : ""].filter(Boolean),
    invites.map((item) => {
      const job = posting(item.postingId);
      const row = [
        esc(job.title),
        esc(company(item.companyId).name),
        esc(participant(item.participantId).name),
        `<span class="status ${item.status}">${statusText(item.status)}</span>`,
        esc(item.date),
      ];
      if (participantCanReply) {
        row.push(`<div class="button-row"><button class="tiny" type="button" data-action="invite-status" data-id="${item.id}" data-status="accepted">수락</button><button class="tiny" type="button" data-action="invite-status" data-id="${item.id}" data-status="rejected">거절</button></div>`);
      }
      return row;
    }),
  );
}

function postingsTable() {
  return table(
    ["공고", "기업", "분야", "보상"],
    data.postings.map((job) => [esc(job.title), esc(company(job.companyId).name), esc(job.category), esc(job.reward)]),
  );
}

function participantsTable() {
  return table(
    ["이름", "전공", "기술"],
    data.participants.map((person) => [esc(person.name), esc(person.major), esc(person.skills.join(", "))]),
  );
}

function companiesTable() {
  return table(
    ["기업", "담당자", "분야", "공고"],
    data.companies.map((item) => [
      esc(item.name),
      `${esc(item.manager)}<br />${esc(item.email)}`,
      esc(item.field),
      String(data.postings.filter((job) => job.companyId === item.id).length),
    ]),
  );
}

function flowTable() {
  const rows = [
    ...data.applications.map((item) => ({ ...item, type: "지원" })),
    ...data.invites.map((item) => ({ ...item, type: "요청" })),
  ];
  return table(
    ["유형", "공고", "참여자", "상태"],
    rows.map((item) => [
      esc(item.type),
      esc(posting(item.postingId).title),
      esc(participant(item.participantId).name),
      `<span class="status ${item.status}">${statusText(item.status)}</span>`,
    ]),
  );
}

function apply(postingId) {
  if (appFor(postingId)) {
    toast("이미 지원한 공고입니다.");
    return;
  }
  data.applications.unshift({
    id: `a-${Date.now()}`,
    postingId,
    participantId: "p-me",
    status: "pending",
    date: today(),
  });
  save();
  toast("즉시지원이 완료되었습니다.");
  render();
}

function invite(postingId, personId) {
  const job = posting(postingId);
  if (inviteFor(postingId, personId)) {
    toast("이미 보낸 참여 요청입니다.");
    return;
  }
  data.invites.unshift({
    id: `i-${Date.now()}`,
    postingId,
    companyId: job.companyId,
    participantId: personId,
    status: "pending",
    date: today(),
  });
  save();
  toast("참여 요청을 보냈습니다.");
  render();
}

function updateStatus(collection, id, status) {
  const item = data[collection].find((entry) => entry.id === id);
  if (!item) return;
  item.status = status;
  save();
  toast(`상태가 ${statusText(status)}으로 변경되었습니다.`);
  render();
}

function resetDemo() {
  data = structuredClone(seed);
  save();
  toast("데모 데이터가 초기화되었습니다.");
  render();
}

function handleClick(event) {
  const routeButton = event.target.closest("[data-route]");
  if (routeButton) {
    routeTo(routeButton.dataset.route);
    return;
  }

  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;
  const { action, id, status, posting: postingId, person, keyword } = actionButton.dataset;

  if (action === "search-home") {
    sessionStorage.setItem("jobKeyword", document.querySelector("#heroKeyword")?.value || "");
    sessionStorage.setItem("jobCategory", document.querySelector("#heroCategory")?.value || "");
    sessionStorage.setItem("jobLocation", document.querySelector("#heroLocation")?.value || "");
    routeTo("jobs");
  }
  if (action === "quick-search") {
    sessionStorage.setItem("jobKeyword", keyword || "");
    sessionStorage.setItem("jobCategory", "");
    sessionStorage.setItem("jobLocation", "");
    routeTo("jobs");
  }
  if (action === "apply") apply(id);
  if (action === "invite") invite(postingId, person);
  if (action === "application-status") updateStatus("applications", id, status);
  if (action === "invite-status") updateStatus("invites", id, status);
  if (action === "reset") resetDemo();
}

function render() {
  const current = route();
  const [name, param] = current.split(":");
  activeNav(name);
  if (name === "home") renderHome();
  else if (name === "jobs") renderJobs();
  else if (name === "job-detail") renderDetail(param);
  else if (name === "resume") renderResume();
  else if (name === "company") renderCompany();
  else if (name === "post-new") renderPostForm();
  else if (name === "admin") renderAdmin();
  else renderHome();
  window.scrollTo(0, 0);
}

document.addEventListener("click", handleClick);
window.addEventListener("hashchange", render);
render();
