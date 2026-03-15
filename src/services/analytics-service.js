import { db } from "../models/db.js";

export const analyticsService = {
  getUserAnalytics: async function (userId) {
    const user = await db.userStore.getUserById(userId);
    const categories = await db.categoryStore.getUserCategories(user);
    let categoryId = null;
    let categoryTrails = null;
    const trails = [];
    for (let i = 0; i < categories.length; i += 1) {
      categoryId = categories[i]._id;
      // eslint-disable-next-line no-await-in-loop
      categoryTrails = await db.trailStore.getTrailsByCategoryId(categoryId);
      trails.push(...categoryTrails);
    };
    const stats = {
      categories: categories,
      trails: trails,
      categoryCount: categories.length,
      trailCount: trails.length,
    };
    return stats;
  },

  getAllUserAnalytics: async function (allUsers) {
    const stats = [];
    for (let i = 0; i < allUsers.length; i += 1) {
      const user = allUsers[i]
      // eslint-disable-next-line no-await-in-loop
      const categories = await db.categoryStore.getUserCategories(user._id);
      
      let categoryId = null;
      let categoryTrails = null;
      const trails = [];
      for (let j = 0; j < categories.length; j += 1) {
        categoryId = categories[j]._id;
        // eslint-disable-next-line no-await-in-loop
        categoryTrails = await db.trailStore.getTrailsByCategoryId(categoryId);
        trails.push(...categoryTrails);
      };
      stats.push({
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        // categories: categories,
        // trails: trails,
        categoryCount: categories.length,
        trailCount: trails.length,
      });
    };
    return stats;
  },
}