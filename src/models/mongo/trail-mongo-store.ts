import { TrailMongoose } from "./trail.js";
// import { Category } from "./category.js";
import { Trail } from "../../types/trail-tracker-types.js";

export const trailMongoStore = {
  async getAllTrails(): Promise<Trail[]> {
    const trails = await TrailMongoose.find().lean();
    // trails.forEach((trail) => {
    //   // @ts-ignore
    //   // trail.user = `${trail.user.firstName} ${trail.user.lastName}`;
    // });
    return trails;
  },

  async getTrailsByCategoryId(id: string): Promise<Trail[] | null> {
    const trails = await TrailMongoose.find({ categoryid: id }).lean();
    if (!trails) {
      return null;
    }
    return trails;
  },

  async getTrailById(id: string): Promise<Trail | null> {
    if (id) {
      const trail = await TrailMongoose.findOne({ _id: id }).lean();
      return trail;
    }
    return null;
  },

  async getUserTrails(id: string) {
    const trail = await TrailMongoose.find({ userid: id }).lean();
    return trail;
  },

  async addTrail(categoryid: string, trail: Trail): Promise<Trail | null> {
    let newTrail = new TrailMongoose({ ...trail, categoryid: categoryid });
    const trailObj = await newTrail.save();
    return this.getTrailById(trailObj._id);
  },

  async deleteTrail(id: string) {
    try {
      await TrailMongoose.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllTrails() {
    await TrailMongoose.deleteMany({});
  },

  async updateTrail(id: any, updatedTrail: any): Promise<Trail | null> {
    const trailDoc = await TrailMongoose.findOne({ _id: id });
    if (!trailDoc) {
      return null; 
    }
    trailDoc.title = updatedTrail.title;
    trailDoc.description = updatedTrail.description;
    trailDoc.location = updatedTrail.location;
    trailDoc.lattitude = updatedTrail.lattitude;
    trailDoc.longitude = updatedTrail.longitude;
    trailDoc.distance = updatedTrail.distance;
    trailDoc.img = updatedTrail.img;
    await trailDoc.save();
    return updatedTrail;
  },
};

// export const trailMongoStore = {
//   async getAllTrails() {
//     const trails = await Trail.find().lean();
//     return trails;
//   },

//   async addTrail(categoryId, trail) {
//     trail.categoryid = categoryId;
//     const newTrail = new Trail(trail);
//     const trailObj = await newTrail.save();
//     return this.getTrailById(trailObj._id);
//   },

//   async getTrailsByCategoryId(id) {
//     const trails = await Trail.find({ categoryid: id }).lean();
//     return trails;
//   },

//   async getTrailById(id) {
//     if (id) {
//       const trail = await Trail.findOne({ _id: id }).lean();
//       return trail;
//     }
//     return null;
//   },

//   async deleteTrail(id) {
//     try {
//       await Trail.deleteOne({ _id: id });
//     } catch (error) {
//       console.log("bad id");
//     }
//   },

//   async deleteAllTrails() {
//     await Trail.deleteMany({});
//   },

//   async updateTrail(trail, updatedTrail) {
//     const trailDoc = await Trail.findOne({ _id: trail._id });
//     trailDoc.title = updatedTrail.title;
//     trailDoc.description = updatedTrail.description;
//     trailDoc.location = updatedTrail.location;
//     trailDoc.lattitude = updatedTrail.lattitude;
//     trailDoc.longitude = updatedTrail.longitude;
//     trailDoc.distance = updatedTrail.distance;
//     await trailDoc.save();
//   },
// };
