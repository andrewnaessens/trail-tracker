// import Mongoose from "mongoose";

import { Schema, model } from "mongoose";
import { Trail } from "../../types/trail-tracker-types";

const trailSchema = new Schema<Trail>({
  title: String,
  description: String,
  location: String,
  lattitude: Number,
  longitude: Number,
  distance: Number,
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  // },
  categoryid: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  img: [String],
});

export const TrailMongoose = model("Trail", trailSchema);

// const { Schema } = Mongoose;

// const trailSchema = new Schema({
//   title: String,
//   description: String,
//   location: String,
//   lattitude: Number,
//   longitude: Number,
//   distance: Number,
//   categoryid: {
//     type: Schema.Types.ObjectId,
//     ref: "Category",
//   },
// });

// export const Trail = Mongoose.model("Trail", trailSchema);

