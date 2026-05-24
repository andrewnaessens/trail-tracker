import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";

export const aboutController = {
  index: {
    handler: async function (request: Request, h: ResponseToolkit) {
      const loggedInUser = request.auth.credentials;
      const viewData = {
        title: "About TrailTracker",
        user: loggedInUser,
      };
      return h.view("about-view", viewData);
    },
  },
};
