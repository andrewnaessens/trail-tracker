import { Trail } from "./trail.js";
import { Category } from "./category.js";

export const trailMongoStore = {
  async getAllTrails() {
    const trails = await Trail.find().lean();
    return trails;
  },

  async addTrail(categoryId, trail) {
    trail.categoryid = categoryId;
    const newTrail = new Trail(trail);
    const trailObj = await newTrail.save();
    return this.getTrailById(trailObj._id);
  },

  async getTrailsByCategoryId(id) {
    const trails = await Trail.find({ categoryid: id }).lean();
    return trails;
  },

  async getTrailById(id) {
    if (id) {
      const trail = await Trail.findOne({ _id: id }).lean();
      return trail;
    }
    return null;
  },

  async deleteTrail(id) {
    try {
      await Trail.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllTrails() {
    await Trail.deleteMany({});
  },

  async updateTrail(trail, updatedTrail) {
    const trailDoc = await Trail.findOne({ _id: trail._id });
    trailDoc.title = updatedTrail.title;
    trailDoc.description = updatedTrail.description;
    trailDoc.location = updatedTrail.location;
    trailDoc.lattitude = updatedTrail.lattitude;
    trailDoc.longitude = updatedTrail.longitude;
    trailDoc.distance = updatedTrail.distance;
    await trailDoc.save();
  },
};
