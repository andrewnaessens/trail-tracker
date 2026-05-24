import { UserSpec } from "../models/joi-schemas.js";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { analyticsService } from "../services/analytics-service.js";

export const profileController = {
  index: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const user = await db.userStore.getUserById(request.params.id);
      console.log(user);
      const stats = await analyticsService.getUserAnalytics(user);
      const viewData = {
        title: "TrailTracker Profile",
        user: user,
        categories: stats.categories,
        trails: stats.trails,
        categoryCount: stats.categoryCount,
        trailCount: stats.trailCount,
      };
      return h.view("user-profile-view", viewData);
    },
  },

  updateUser: {
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request: Request, h: ResponseToolkit, error: any) {
        return h.view("user-profile-view", { title: "Edit User error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      const user = await db.userStore.getUserById(request.params.id);
      const userPayload = request.payload as any;
      const newUser = {
        firstName: userPayload.firstName,
        lastName: userPayload.lastName,
        email: userPayload.email,
        password: userPayload.password,
      };
      await db.userStore.updateUser(user, newUser);
      return h.redirect("/login");
    },
  },

  userAnalytics: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const user = await db.userStore.getUserById(request.params.id);
      const categories = await db.categoryStore.getUserCategories(user);
      let categoryCount = 0;
      let categoryId = null;
      let categoryTrails = null;
      const trails = [];
      for (let i = 0; i < categories.length; i += 1) {
        categoryCount += 1
        categoryId = categories[i]._id;
        // eslint-disable-next-line no-await-in-loop
        categoryTrails = await db.trailStore.getTrailsByCategoryId(categoryId);
        trails.push(...categoryTrails);
      };
      let trailCount = 0;
      for (let i = 0; i < trails.length; i += 1) {
        trailCount += 1
      };
      const viewData = {
        title: "TrailTracker Profile",
        user: user,
        categories: categories,
        trails: trails,
        categoryCount: categoryCount,
        trailCount: trailCount,
      };
      console.log(categories);
      console.log(trails)
      console.log(categoryCount, trailCount);
      return h.view("user-profile-view", viewData);
    },
  },
};