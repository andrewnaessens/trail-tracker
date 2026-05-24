import { userApi } from "./api/user-api.js";
import { categoryApi } from "./api/category-api.js";
import { trailApi } from "./api/trail-api.js";

export const apiRoutes = [
  { method: "GET" as const, path: "/api/users", config: userApi.find },
  { method: "POST" as const, path: "/api/users", config: userApi.create },
  { method: "DELETE" as const, path: "/api/users", config: userApi.deleteAll },
  { method: "GET" as const, path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST" as const, path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "POST" as const, path: "/api/categories", config: categoryApi.create },
  { method: "DELETE" as const, path: "/api/categories", config: categoryApi.deleteAll },
  { method: "GET" as const, path: "/api/categories", config: categoryApi.find },
  { method: "GET" as const, path: "/api/usercategories/{id}", config: categoryApi.findByUserId },
  { method: "GET" as const, path: "/api/categories/{id}", config: categoryApi.findOne },
  { method: "DELETE" as const, path: "/api/categories/{id}", config: categoryApi.deleteOne },

  { method: "GET" as const, path: "/api/trails", config: trailApi.find },
  { method: "GET" as const, path: "/api/usertrails/{id}", config: trailApi.findByUserId },
  { method: "GET" as const, path: "/api/trails/{id}", config: trailApi.findOne },
  { method: "POST" as const, path: "/api/categories/{id}/trails", config: trailApi.create },
  { method: "PUT" as const, path: "/api/categories/{categoryid}/trails/{id}", config: trailApi.update },
  { method: "POST" as const, path: "/api/categories/{categoryid}/trails/{id}/uploadimage", config: trailApi.uploadImage },
  { method: "DELETE" as const, path: "/api/trails", config: trailApi.deleteAll },
  { method: "DELETE" as const, path: "/api/trails/{id}", config: trailApi.deleteOne },
];
