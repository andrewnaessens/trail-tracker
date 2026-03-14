import { CategorySpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const category = await db.categoryStore.getUserCategories(loggedInUser._id);
      const thisUser = await db.userStore.getUserById(loggedInUser._id);
      const allUsers = await db.userStore.getAllUsers();
      if ( thisUser.firstName === "admin" ) {
        const viewData = {
          title: "TrailTracker Admin Dashboard",
          user: loggedInUser,
          users: allUsers,
        };
        return h.view("admin-dashboard-view", viewData);
      }
      // eslint-disable-next-line no-else-return
      else {
        const viewData = {
          title: "TrailTracker Dashboard",
          user: loggedInUser,
          category: category,
        };
        return h.view("dashboard-view", viewData);
      }
    },
  },

  addCategory: {
    validate: {
      payload: CategorySpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Category error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newCategory = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.categoryStore.addCategory(newCategory);
      return h.redirect("/dashboard");
    },
  },

  deleteCategory: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      await db.categoryStore.deleteCategoryById(category._id);
      return h.redirect("/dashboard");
    },
  },
};
