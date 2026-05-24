import Boom from "@hapi/boom";
import { IdSpec, CategoryArraySpec, CategorySpec, CategorySpecPlus } from "../models/joi-schemas.js";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const categoryApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const categories = await db.categoryStore.getAllCategories();
        return categories;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: CategoryArraySpec, failAction: validationError },
    description: "Get all categories",
    notes: "Returns all categories",
  },

  findByUserId: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const categories = await db.categoryStore.getUserCategories(request.params.id);
        return categories;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all categories for a specific user",
    notes: "Returns all categories for a specific user",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: CategoryArraySpec, failAction: validationError },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request: Request) {
      try {
        const category = await db.categoryStore.getCategoryById(request.params.id);
        if (!category) {
          return Boom.notFound("No Category with this id");
        }
        return category;
      } catch (err) {
        return Boom.serverUnavailable("No Category with this id");
      }
    },
    tags: ["api"],
    description: "Find a Category",
    notes: "Returns a category",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: CategorySpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const category = request.payload;
        const newCategory = await db.categoryStore.addCategory(category);
        if (newCategory) {
          return h.response(newCategory).code(201);
        }
        return Boom.badImplementation("error creating category");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Category",
    notes: "Returns the newly created category",
    validate: { payload: CategorySpec, failAction: validationError },
    response: { schema: CategorySpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const category = await db.categoryStore.getCategoryById(request.params.id);
        if (!category) {
          return Boom.notFound("No Category with this id");
        }
        await db.categoryStore.deleteCategoryById(category._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Category with this id");
      }
    },
    tags: ["api"],
    description: "Delete a category",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        await db.categoryStore.deleteAllCategories();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all CategoryApi",
  },
};
