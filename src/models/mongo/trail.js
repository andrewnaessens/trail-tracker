import Mongoose from "mongoose";

const { Schema } = Mongoose;

const trailSchema = new Schema({
  title: String,
  description: String,
  location: String,
  lattitude: Number,
  longitude: Number,
  distance: Number,
  categoryid: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

export const Trail = Mongoose.model("Trail", trailSchema);
