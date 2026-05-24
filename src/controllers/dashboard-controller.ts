import { CategorySpec } from "../models/joi-schemas.js";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { analyticsService } from "../services/analytics-service.js";

export const dashboardController = {
  index: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const loggedInUser = request.auth.credentials;
      const userfirstName = loggedInUser.firstName
      const category = await db.categoryStore.getUserCategories(loggedInUser);
      const allUsers = await db.userStore.getAllUsers();
      const users = await analyticsService.getAllUserAnalytics(allUsers);
      if ( userfirstName === "admin" ) {
        const viewData = {
          title: "TrailTracker Admin Dashboard",
          user: loggedInUser,
          users: users,
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
      failAction: function (request: Request, h: ResponseToolkit, error: any) {
        return h.view("dashboard-view", { title: "Add Category error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      const loggedInUser = request.auth.credentials;
      const categoryPayload = request.payload as any;
      const newCategory = {
        userid: loggedInUser._id,
        title: categoryPayload.title,
      };
      await db.categoryStore.addCategory(newCategory);
      return h.redirect("/dashboard");
    },
  },

  deleteCategory: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      await db.categoryStore.deleteCategoryById(category._id);
      return h.redirect("/dashboard");
    },
  },
};

