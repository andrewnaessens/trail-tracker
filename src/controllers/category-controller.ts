import { TrailSpec } from "../models/joi-schemas.js";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";
import { TrailMongoose } from "../models/mongo/trail.js";

export const categoryController = {
  index: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const loggedInUser = request.auth.credentials;
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const viewData = {
        title: "Category",
        user: loggedInUser,
        category: category,
      };
      return h.view("category-view", viewData);
    },
  },

  addTrail: {
    validate: {
      payload: TrailSpec,
      options: { abortEarly: false },
      failAction: function (request: Request, h: ResponseToolkit, error: any) {
        return h.view("category-view", { title: "Add trail error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const trailPayload = request.payload as any;
      const newTrail = {
        title: trailPayload.title,
        description: trailPayload.description,
        location: trailPayload.location,
        lattitude: Number(trailPayload.lattitude),
        longitude: Number(trailPayload.longitude),
        distance: Number(trailPayload.distance),
      };
      await db.trailStore.addTrail(category._id, newTrail);
      return h.redirect(`/category/${category._id}`);
    },
  },

  deleteTrail: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      await db.trailStore.deleteTrail(request.params.trailid);
      return h.redirect(`/category/${category._id}`);
    },
  },

  uploadImage: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      try {
        const uploadPayload = request.payload as any;
        const file = uploadPayload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(uploadPayload.imagefile);
          category.img = url;
          await db.categoryStore.updateCategory(category);
        }
        return h.redirect(`/category/${category._id}`);
      } catch (err: any) {
        console.log(err);
        return h.redirect(`/category/${category._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
};