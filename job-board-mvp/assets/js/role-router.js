export function defaultRouteForRole(role) {
  const routes = {
    student: "student.html",
    company: "company.html",
    enterprise: "company.html",
    mentor: "company.html#mentor",
    admin: "admin.html",
  };
  return routes[role] || "index.html";
}

export function loginRouteForRole(role) {
  const mapped = { company: "enterprise", mentor: "enterprise" }[role] || role;
  return `login.html?role=${encodeURIComponent(mapped || "student")}`;
}

export function requiredRoleForPage(pageContext) {
  const roles = {
    student: "student",
    company: "enterprise",
    admin: "admin",
  };
  return roles[pageContext] || null;
}

export function topRouteForRoute(routeName) {
  if (routeName.startsWith("student-portal") || ["problems", "profile", "team", "education", "internship"].includes(routeName)) return "student-portal";
  if (routeName.startsWith("company-portal") || ["company", "mentor"].includes(routeName)) return "company-portal";
  if (routeName.startsWith("admin-portal") || routeName === "admin") return "admin-portal";
  return routeName;
}

export function hrefForRoute(routeName) {
  const [name, section] = String(routeName || "").split(":");
  const paths = {
    home: "index.html",
    "student-portal": loginRouteForRole("student"),
    "company-portal": loginRouteForRole("enterprise"),
    "admin-portal": loginRouteForRole("admin"),
    about: "index.html#about",
    kpi: "index.html#kpi",
    login: "login.html",
    signup: "signup.html",
    mypage: "index.html#mypage",
  };
  if (!paths[name]) return null;
  if (section && ["student-portal", "company-portal", "admin-portal"].includes(name)) return `${paths[name]}#${section}`;
  return paths[name];
}
