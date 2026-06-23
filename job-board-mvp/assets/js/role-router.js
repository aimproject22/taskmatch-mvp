export function defaultRouteForRole(role) {
  const routes = {
    student: "student.html",
    company: "company.html",
    mentor: "company.html#mentor",
    admin: "admin.html",
  };
  return routes[role] || "index.html";
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
    "student-portal": "student.html",
    "company-portal": "company.html",
    "admin-portal": "admin.html",
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
