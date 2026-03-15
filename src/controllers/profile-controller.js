import { UserSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { analyticsService } from "../services/analytics-service.js";

export const profileController = {
  index: {
    handler: async function (request, h) {
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
      failAction: function (request, h, error) {
        return h.view("user-profile-view", { title: "Edit User error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.params.id);
      const newUser = {
        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
        email: request.payload.email,
        password: request.payload.password,
      };
      await db.userStore.updateUser(user, newUser);
      return h.redirect("/login");
    },
  },

  userAnalytics: {
    handler: async function (request, h) {
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