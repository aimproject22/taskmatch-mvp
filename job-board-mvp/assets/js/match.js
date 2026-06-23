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

function relatedTerms(value) {
  const base = norm(value);
  const map = {
    "이차전지·에너지소재": ["전지", "에너지", "소재", "xrd", "sem", "분말공정", "소결", "신소재공학"],
    "이차전지·소재": ["이차전지", "에너지소재", "전지", "소재", "xrd", "sem", "분말공정", "소결", "신소재공학"],
    "첨단모빌리티": ["자율주행", "lidar", "신호처리", "시뮬레이션", "전자공학"],
    "AI·반도체 SW": ["ai", "반도체", "python", "machine learning", "materials ai", "pytorch", "cnn", "이미지 분류", "컴퓨터공학"],
    "철강·신소재": ["철강", "신소재", "금속소재", "sem", "image analysis", "이미지 분석", "python", "금속공학"],
    "우주항공·해양/철강·신소재": ["철강", "신소재", "금속소재", "sem", "image analysis", "이미지 분석", "python", "금속공학"],
    python: ["파이썬", "데이터 분석", "machine learning", "materials ai", "pytorch", "cnn"],
    "machine learning": ["머신러닝", "재료ai", "materials ai", "물성 예측", "딥러닝", "ai"],
    "materials ai": ["재료ai", "소재 데이터", "물성 예측", "machine learning", "python"],
    "재료ai": ["materials ai", "소재 데이터", "물성 예측", "machine learning", "python"],
    sem: ["이미지 분석", "미세조직", "신소재공학"],
    xrd: ["결정성", "소재", "분석"],
    "image analysis": ["이미지 분석", "미세조직", "sem"],
    "이미지 분석": ["image analysis", "미세조직", "sem"],
    "금속소재": ["금속공학", "철강", "신소재"],
    "금속공학": ["금속소재", "철강", "신소재"],
    "신소재공학부": ["신소재공학", "재료공학", "재료ai", "금속소재"],
    "신소재공학": ["신소재공학부", "재료공학", "재료ai", "금속소재"],
  };
  return [base, ...(map[value] || map[base] || [])].map(norm);
}

function includesRelated(source, target) {
  const text = norm(Array.isArray(source) ? source.join(" ") : source);
  return relatedTerms(target).some((term) => text.includes(term));
}

export function calculateFit(profile, problem) {
  const profileSkills = list(profile.skills);
  const equipment = list(profile.equipment);
  const interests = list(profile.interests);
  const text = [profile.department, profile.projects, profile.preferredProblemType, ...profileSkills, ...equipment, ...interests].join(" ");
  const required = [...list(problem.requiredSkills), ...list(problem.requiredMajors)];
  const matched = required.filter((item) => includesRelated(text, item) || profileSkills.map(norm).includes(norm(item)));
  const skillScore = required.length ? (matched.length / required.length) * 55 : 0;
  const fieldScore = includesRelated(interests.join(" "), problem.field) || includesRelated(text, problem.field) ? 25 : 0;
  const projectScore = problem.requiredSkills.filter((skill) => includesRelated(profile.projects, skill)).length * 5;
  const calculatedScore = Math.min(100, Math.round(skillScore + fieldScore + Math.min(20, projectScore)));
  const overrideScore = Number(profile.fitOverrides?.[problem.id] || 0);
  const score = overrideScore ? Math.max(calculatedScore, overrideScore) : calculatedScore;
  return {
    score,
    matched: [...new Set(matched)].slice(0, 5),
    reason: [...new Set(matched)].slice(0, 3).join(", ") || "관심 분야 기반 추천",
  };
}

export function scoreProblemList(profile, problems) {
  return problems.map((problem) => ({ problem, fit: calculateFit(profile, problem) })).sort((a, b) => b.fit.score - a.fit.score);
}
