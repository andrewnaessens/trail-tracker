import { Category, Trail } from "../../types/trail-tracker-types";
import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const trailJsonStore = {
  async getAllTrails() {
    await db.read();
    return db.data.trails;
  },

  async addTrail(categoryId: Category, trail: Trail): Promise<Trail | null> {
    await db.read();
    trail._id = v4();
    trail.categoryid = categoryId;
    db.data.trails.push(trail);
    await db.write();
    return trail;
  },

  async getTrailsByCategoryId(id: string): Promise<Trail | null> {
    await db.read();
    let t = db.data.trails.filter((trail: Trail) => trail.categoryid === id);
    if (t === undefined) t = null;
    return t;
  },

  async getTrailById(id: string): Promise<Trail | null> {
    await db.read();
    let t = db.data.trails.find((trail: Trail) => trail._id === id);
    if (t === undefined) t = null;
    return t;
  },

  async deleteTrail(id: string) {
    await db.read();
    const index = db.data.trails.findIndex((trail: Trail) => trail._id === id);
    if (index !== -1) db.data.trails.splice(index, 1);
    await db.write();
  },

  async deleteAllTrails() {
    db.data.trails = [];
    await db.write();
  },

  async updateTrail(trail: Trail, updatedTrail: any) {
    trail.title = updatedTrail.title;
    trail.description = updatedTrail.description;
    trail.location = updatedTrail.location;
    trail.lattitude = updatedTrail.lattitude;
    trail.longitude = updatedTrail.longitude;
    trail.distance = updatedTrail.distance;
    await db.write();
  },
};
