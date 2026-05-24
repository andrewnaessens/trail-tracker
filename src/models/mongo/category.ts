import { Schema, model } from "mongoose";
import { Category } from "../../types/trail-tracker-types";

const categorySchema = new Schema<Category>({
  title: String,
  img: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  trails: [{ type: Schema.Types.ObjectId, ref: "Trail" }]
});

export const CategoryMongoose = model("Category", categorySchema);



// const { Schema } = Mongoose;

// const categorySchema = new Schema({
//   title: String,
//   img: String,
//   userid: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//   },
// });

// export const Category = Mongoose.model("Category", categorySchema);
