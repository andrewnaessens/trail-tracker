import { v4 } from "uuid";
import { trailMemStore } from "./trail-mem-store.js";
import { Category } from "../../types/trail-tracker-types.js";

let categories = [] as any;

export const categoryMemStore = {
  async getAllCategories() {
    return categories;
  },

  async addCategory(category: Category): Promise<Category | null> {
    category._id = v4();
    categories.push(category);
    return category;
  },

  async getCategoryById(id: string) {
    const list = categories.find((category: Category) => category._id === id);
    if (list) {
      list.trails = await trailMemStore.getTrailsByCategoryId(list._id);
      return list;
    }
    return null;
  },

  async getUserCategories(userid: string) {
    return categories.filter((category: Category) => category._id === userid);
  },

  async deleteCategoryById(id: string) {
    const index = categories.findIndex((category: Category) => category._id === id);
    if (index !== -1) categories.splice(index, 1);
  },

  async deleteAllCategories() {
    categories = [];
  },
};
