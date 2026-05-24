import { v4 } from "uuid";
import { Category, Trail } from "../../types/trail-tracker-types";

let trails = [] as any;

export const trailMemStore = {
  async getAllTrails() {
    return trails;
  },

  async addTrail(categoryId: string, trail: Trail): Promise<Trail | null> {
    trail._id = v4();
    trail.category["_id"] = categoryId;
    trails.push(trail);
    return trail;
  },

  async getTrailsByCategoryId(id: string): Promise<Trail | null> {
    return trails.filter((trail: Trail) => trail.category["_id"] === id);
  },

  async getTrailById(id: string): Promise<Trail | null> {
    let trail = trails.find((trail: Trail) => trail._id === id);
    if (trail == undefined) {
      trail = null;
    }
    return trail;
  },

  async getCategoryTrails(category: Category): Promise<Trail | null> {
    return trails.filter((trail: Trail) => trail.category["_id"] === category._id);
  },

  async deleteTrail(id: string) {
    const index = trails.findIndex((trail: Trail) => trail._id === id);
    if (index !== -1) trails.splice(index, 1);
  },

  async deleteAllTrails() {
    trails = [];
  },

  async updateTrail(trail: Trail, updatedTrail: any) {
    trail.title = updatedTrail.title;
    trail.description = updatedTrail.description;
    trail.location = updatedTrail.location;
    trail.lattitude = updatedTrail.lattitude;
    trail.longitude = updatedTrail.longitude;
    trail.distance = updatedTrail.distance;
  },
};
