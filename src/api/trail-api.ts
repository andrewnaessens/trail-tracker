import Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { IdSpec, TrailSpec, TrailSpecPlus, TrailArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
import { imageStore } from "../models/image-store.js";
import Joi from "joi";

export const trailApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const trails = await db.trailStore.getAllTrails();
        return trails;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: TrailArraySpec, failAction: validationError },
    description: "Get all trailApi",
    notes: "Returns all trailApi",
  },

  findByUserId: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const trails = await db.trailStore.getUserTrails(request.params.id);
        return trails;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all trails for a specific user",
    notes: "Returns all trails for a specific user",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: TrailArraySpec, failAction: validationError },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request: Request) {
      try {
        const trail = await db.trailStore.getTrailById(request.params.id);
        if (!trail) {
          return Boom.notFound("No trail with this id");
        }
        return trail;
      } catch (err) {
        return Boom.serverUnavailable("No trail with this id");
      }
    },
    tags: ["api"],
    description: "Find a Trail",
    notes: "Returns a trail",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: TrailSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const trail = await db.trailStore.addTrail(request.params.id, request.payload);
        if (trail) {
          return h.response(trail).code(201);
        }
        return Boom.badImplementation("error creating trail");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a trail",
    notes: "Returns the newly created trail",
    validate: { payload: TrailSpec },
    response: { schema: TrailSpecPlus, failAction: validationError },
  },

  update: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        // const payload = request.payload as any;
    
        // // re-inject the parameter ID directly into the database update schema
        // payload._id = request.params.id; 
        const trail = await db.trailStore.updateTrail(request.params.id, request.payload);
        if (trail) {
          return h.response(trail).code(200);
        }
        return Boom.badImplementation("error updating trail");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Update a trail",
    notes: "Returns the updated trail",
    validate: { payload: TrailSpec },
    response: { schema: TrailSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        await db.trailStore.deleteAllTrails();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all trailApi",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const trail = await db.trailStore.getTrailById(request.params.id);
        if (!trail) {
          return Boom.notFound("No Trail with this id");
        }
        await db.trailStore.deleteTrail(trail._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Trail with this id");
      }
    },
    tags: ["api"],
    description: "Delete a trail",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  uploadImage: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      const trail = await db.trailStore.getTrailById(request.params.id);
      try {
        const uploadPayload = request.payload as any;
        const file = uploadPayload.imagefile;

        if (file && file.length > 0) {
        const url = await imageStore.uploadImage(file);
        // make sure img is initialised as an array
        if (!trail.img) trail.img = [];
        // push the image into the array
        trail.img.push(url); 
        await db.trailStore.updateTrail(trail._id, trail);
        return h.response(trail).code(200);
        }
      } catch (err) {
        return Boom.serverUnavailable("Cloudinary Upload Error");
      }
    },
    tags: ["api"],
    description: "Upload a trail image to a trail",
    notes: "Returns the updated trail",
    validate: { 
      payload: Joi.object({
        imagefile: Joi.any() 
      }).options({ allowUnknown: true }) },
    response: { schema: TrailSpecPlus, failAction: validationError },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
      allow: "multipart/form-data", 
    }
  },
};
