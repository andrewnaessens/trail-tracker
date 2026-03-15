import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { categoryController } from "./controllers/category-controller.js";
import { trailController } from "./controllers/trail-controller.js";
import { profileController } from "./controllers/profile-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addcategory", config: dashboardController.addCategory },
  { method: "GET", path: "/dashboard/deletecategory/{id}", config: dashboardController.deleteCategory },
  { method: "GET", path: "/dashboard/deleteuser/{id}", config: accountsController.deleteUser },

  { method: "GET", path: "/category/{id}", config: categoryController.index },
  { method: "POST", path: "/category/{id}/addtrail", config: categoryController.addTrail },
  { method: "GET", path: "/category/{id}/deletetrail/{trailid}", config: categoryController.deleteTrail },

  { method: "GET", path: "/trail/{id}/edittrail/{trailid}", config: trailController.index },
  { method: "POST", path: "/trail/{id}/updatetrail/{trailid}", config: trailController.update },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },

  { method: "GET", path: "/profile/{id}", config: profileController.index },
  { method: "POST", path: "/profile/updateuser/{id}", config: profileController.updateUser },
];
