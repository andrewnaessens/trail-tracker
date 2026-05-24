import { TrailSpec } from "../models/joi-schemas.js";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { Trail } from "../types/trail-tracker-types.js";
import { imageStore } from "../models/image-store.js";

export const trailController = {
  index: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const loggedInUser = request.auth.credentials;
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const trail = await db.trailStore.getTrailById(request.params.trailid);
      
      const viewData = {
        title: "Edit Trail",
        user: loggedInUser,
        category: category,
        trail: trail,
      };
      return h.view("trail-view", viewData);
    },
  },
  update: {
    validate: {
      payload: TrailSpec,
      options: { abortEarly: false },
      failAction: function (request: Request, h: ResponseToolkit, error: any) {
        return h.view("trail-view", { title: "Edit trail error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      const trail = await db.trailStore.getTrailById(request.params.trailid);
      const trailPayload = request.payload as any;
      const newTrail = {
        title: trailPayload.title,
        description: trailPayload.description,
        location: trailPayload.location,
        lattitude: Number(trailPayload.lattitude),
        longitude: Number(trailPayload.longitude),
        distance: Number(trailPayload.distance),
      };
      await db.trailStore.updateTrail(trail, newTrail);
      return h.redirect(`/category/${request.params.id}`);
    },
  },
};

// export const trailController = {
//   index: {
//     handler: async function (request, h) {
//       const loggedInUser = request.auth.credentials;
//       const category = await db.categoryStore.getCategoryById(request.params.id);
//       const trail = await db.trailStore.getTrailById(request.params.trailid);
      
//       const viewData = {
//         title: "Edit Trail",
//         user: loggedInUser,
//         category: category,
//         trail: trail,
//       };
//       return h.view("trail-view", viewData);
//     },
//   },

//   update: {
//     validate: {
//       payload: TrailSpec,
//       options: { abortEarly: false },
//       failAction: function (request, h, error) {
//         return h.view("trail-view", { title: "Edit trail error", errors: error.details }).takeover().code(400);
//       },
//     },
//     handler: async function (request, h) {
//       const trail = await db.trailStore.getTrailById(request.params.trailid);
//       const newTrail = {
//         title: request.payload.title,
//         description: request.payload.description,
//         location: request.payload.location,
//         lattitude: Number(request.payload.lattitude),
//         longitude: Number(request.payload.longitude),
//         distance: Number(request.payload.distance),
//       };
//       await db.trailStore.updateTrail(trail, newTrail);
//       return h.redirect(`/category/${request.params.id}`);
//     },
//   },
// };
