import { v4 } from "uuid";

let trails = [];

export const trailMemStore = {
  async getAllTrails() {
    return trails;
  },

  async addTrail(categoryId, trail) {
    trail._id = v4();
    trail.categoryid = categoryId;
    trails.push(trail);
    return trail;
  },

  async getTrailsByCategoryId(id) {
    return trails.filter((trail) => trail.categoryid === id);
  },

  async getTrailById(id) {
    let trail = trails.find((trail) => trail._id === id);
    if (trail == undefined) {
      trail = null;
    }
    return trail;
  },

  async getCategoryTrails(categoryId) {
    return trails.filter((trail) => trail.categoryid === categoryId);
  },

  async deleteTrail(id) {
    const index = trails.findIndex((trail) => trail._id === id);
    if (index !== -1) trails.splice(index, 1);
  },

  async deleteAllTrails() {
    trails = [];
  },

  async updateTrail(trail, updatedTrail) {
    trail.title = updatedTrail.title;
    trail.description = updatedTrail.description;
    trail.location = updatedTrail.location;
    trail.lattitude = updatedTrail.lattitude;
    trail.longitude = updatedTrail.longitude;
    trail.distance = updatedTrail.distance;
  },
};
