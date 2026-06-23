export function defaultRouteForRole(role) {
  const routes = {
    student: "student-portal",
    company: "company-portal",
    mentor: "company-portal:mentor",
    admin: "admin-portal",
  };
  return routes[role] || "home";
}

export function topRouteForRoute(routeName) {
  if (routeName.startsWith("student-portal") || ["problems", "profile", "team", "education", "internship"].includes(routeName)) return "student-portal";
  if (routeName.startsWith("company-portal") || ["company", "mentor"].includes(routeName)) return "company-portal";
  if (routeName.startsWith("admin-portal") || routeName === "admin") return "admin-portal";
  return routeName;
}
