import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { categoryController } from "./controllers/category-controller.js";
import { trailController } from "./controllers/trail-controller.js";
import { profileController } from "./controllers/profile-controller.js";

export const webRoutes = [
  { method: "GET" as const, path: "/", config: accountsController.index },
  { method: "GET" as const, path: "/signup", config: accountsController.showSignup },
  { method: "GET" as const, path: "/login", config: accountsController.showLogin },
  { method: "GET" as const, path: "/logout", config: accountsController.logout },
  { method: "POST" as const, path: "/register", config: accountsController.signup },
  { method: "POST" as const, path: "/authenticate", config: accountsController.login },

  { method: "GET" as const, path: "/about", config: aboutController.index },

  { method: "GET" as const, path: "/dashboard", config: dashboardController.index },
  { method: "POST" as const, path: "/dashboard/addcategory", config: dashboardController.addCategory },
  { method: "GET" as const, path: "/dashboard/deletecategory/{id}", config: dashboardController.deleteCategory },
  { method: "GET" as const, path: "/dashboard/deleteuser/{id}", config: accountsController.deleteUser },

  { method: "GET" as const, path: "/category/{id}", config: categoryController.index },
  { method: "POST" as const, path: "/category/{id}/addtrail", config: categoryController.addTrail },
  { method: "GET" as const, path: "/category/{id}/deletetrail/{trailid}", config: categoryController.deleteTrail },

  { method: "GET" as const, path: "/trail/{id}/edittrail/{trailid}", config: trailController.index },
  { method: "POST" as const, path: "/trail/{id}/updatetrail/{trailid}", config: trailController.update },

  { method: "GET" as const, path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false as const } },

  { method: "GET" as const, path: "/profile/{id}", config: profileController.index },
  { method: "POST" as const, path: "/profile/updateuser/{id}", config: profileController.updateUser },
  { method: "POST" as const, path: "/category/{id}/uploadimage", config: categoryController.uploadImage },
];
