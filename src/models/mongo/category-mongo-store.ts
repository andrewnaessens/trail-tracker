import { CategoryMongoose } from "./category.js";
import { Category } from "../../types/trail-tracker-types.js";
import { trailMongoStore } from "./trail-mongo-store.js";

export const categoryMongoStore = {
  async getAllCategories() {
    const categories = await CategoryMongoose.find().lean();
    return categories;
  },

  async getCategoryById(id: string) {
    if (id) {
      const category = await CategoryMongoose.findOne({ _id: id }).lean();
      if (category) {
          category.trails = await trailMongoStore.getTrailsByCategoryId(category._id);
        }
        return category;
    }
    return null;
  },

  async addCategory(category: Category) {
    const newCategory = new CategoryMongoose(category);
    const categoryObj = await newCategory.save();
    return this.getCategoryById(categoryObj._id);
  },

  async getUserCategories(id: string) {
    const category = await CategoryMongoose.find({ userid: id }).populate("trails").lean();
    return category;
  },

  async deleteCategoryById(id: string) {
    try {
      await CategoryMongoose.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllCategories() {
    await CategoryMongoose.deleteMany({});
  },

  async updateCategory(updatedCategory: any) {
    const category = await CategoryMongoose.findOne({ _id: updatedCategory._id });
    if (!category) {
      return null; 
    }
    category.title = updatedCategory.title;
    category.img = updatedCategory.img;
    await category.save();
    return updatedCategory;
  },
};


// export const categoryMongoStore = {
//   async getAllCategories() {
//     const categories = await Category.find().lean();
//     return categories;
//   },

//   async getCategoryById(id) {
//     if (id) {
//       const category = await Category.findOne({ _id: id }).lean();
//       if (category) {
//         category.trails = await trailMongoStore.getTrailsByCategoryId(category._id);
//       }
//       return category;
//     }
//     return null;
//   },

//   async addCategory(category) {
//     const newCategory = new Category(category);
//     const categoryObj = await newCategory.save();
//     return this.getCategoryById(categoryObj._id);
//   },

//   async getUserCategories(id) {
//     const category = await Category.find({ userid: id }).lean();
//     return category;
//   },

//   async deleteCategoryById(id) {
//     try {
//       await Category.deleteOne({ _id: id });
//     } catch (error) {
//       console.log("bad id");
//     }
//   },

//   async deleteAllCategories() {
//     await Category.deleteMany({});
//   },

//   async updateCategory(updatedCategory) {
//     const category = await Category.findOne({ _id: updatedCategory._id });
//     category.title = updatedCategory.title;
//     category.img = updatedCategory.img;
//     await category.save();
//   },
// };
