import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { trailJsonStore } from "./trail-json-store.js";
import { Category } from "../../types/trail-tracker-types.js";
import { CategoryArraySpec } from "../joi-schemas.js";

export const categoryJsonStore = {
  async getAllCategoriess() {
    await db.read();
    return db.data.categories;
  },

  async addCategory(category: Category): Promise<Category | null> {
    await db.read();
    category._id = v4();
    db.data.categories.push(category);
    await db.write();
    return category;
  },

  async getCategoryById(id: string) {
    await db.read();
    let list = db.data.categories.find((category: Category) => category._id === id);
    if (list) {
      list.trails = await trailJsonStore.getTrailsByCategoryId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  async getUserCategories(userid: string) {
    await db.read();
    return db.data.categories.filter((category: Category) => category._id === userid);
  },

  async deleteCategoryById(id: string) {
    await db.read();
    const index = db.data.categories.findIndex((category: Category) => category._id === id);
    if (index !== -1) db.data.categories.splice(index, 1);
    await db.write();
  },

  async deleteAllCategories() {
    db.data.categories = [];
    await db.write();
  },
};
