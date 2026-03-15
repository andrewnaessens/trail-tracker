import { TrailSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const trailController = {
  index: {
    handler: async function (request, h) {
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
      failAction: function (request, h, error) {
        return h.view("trail-view", { title: "Edit trail error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const trail = await db.trailStore.getTrailById(request.params.trailid);
      const newTrail = {
        title: request.payload.title,
        description: request.payload.description,
        location: request.payload.location,
        lattitude: Number(request.payload.lattitude),
        longitude: Number(request.payload.longitude),
        distance: Number(request.payload.distance),
      };
      await db.trailStore.updateTrail(trail, newTrail);
      return h.redirect(`/category/${request.params.id}`);
    },
  },
};
