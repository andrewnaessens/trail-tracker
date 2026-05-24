import * as dotenv from "dotenv";
import Mongoose from "mongoose";
// @ts-ignore
import * as mongooseSeeder from "mais-mongoose-seeder";
import { seedData } from "./seed-data.js";
import { userMongoStore } from "./user-mongo-store.js";
import { categoryMongoStore } from "./category-mongo-store.js";
import { trailMongoStore } from "./trail-mongo-store.js";
import { Db } from "../../types/trail-tracker-types.js";
import Bcrypt from "bcrypt";

const seedLib = mongooseSeeder.default;

async function seed() {
  const seeder = seedLib(Mongoose);

  // manually hash the user passwords in the seed data with 10 salt rounds
  const saltRounds = 10;
  // tells typescript that each user object is a dictionary with user name (e.g. homer, bart)
  // as the key with type string and the user credentials object (e.g. firstName, LastName, email, password) 
  // as the value with type any
  const users = seedData.users as Record<string, any>;
  // loop through all keys in the users object
  for (const key in users) {
    // only hash if the key is not equal to _model
    // this will only hash passwords in user objects
    if (key !== "_model") {
      // wait for Bcrypt to hash each password with 10 salt rounds
      users[key].password = await Bcrypt.hash(users[key].password, saltRounds);
    }
  }

  const dbData = await seeder.seed(seedData, { dropDatabase: false, dropCollections: true });
  console.log(dbData);
}

export function connectMongo(db: Db) {
  dotenv.config();

  Mongoose.set("strictQuery", true);
  // @ts-ignore
  Mongoose.connect(process.env.db);
  const mongoDb = Mongoose.connection;

  db.userStore = userMongoStore;
  db.categoryStore = categoryMongoStore;
  db.trailStore = trailMongoStore;

  mongoDb.on("error", (err) => {
    console.log(`database connection error: ${err}`);
  });

  mongoDb.on("disconnected", () => {
    console.log("database disconnected");
  });

  mongoDb.once("open", function () {
    console.log(`database connected to ${this.name} on ${this.host}`);
    seed();
  });
}

// export function connectMongo() {
//   dotenv.config();

//   Mongoose.set("strictQuery", true);
//   Mongoose.connect(process.env.db);
//   const db = Mongoose.connection;

//   db.on("error", (err) => {
//     console.log(`database connection error: ${err}`);
//   });

//   db.on("disconnected", () => {
//     console.log("database disconnected");
//   });

//   db.once("open", function () {
//     console.log(`database connected to ${this.name} on ${this.host}`);
//     seed();
//   });
// }