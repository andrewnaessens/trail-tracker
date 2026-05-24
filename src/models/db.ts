import { userMemStore } from "./mem/user-mem-store.js";
import { categoryMemStore } from "./mem/category-mem-store.js";
import { trailMemStore } from "./mem/trail-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { categoryJsonStore } from "./json/category-json-store.js";
import { trailJsonStore } from "./json/trail-json-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { categoryMongoStore } from "./mongo/category-mongo-store.js";
import { trailMongoStore } from "./mongo/trail-mongo-store.js";
import { Db } from "../types/trail-tracker-types.js";
import { connectMongo } from "./mongo/connect.js";

export const db: Db = {
  userStore: null,
  categoryStore: null,
  trailStore: null,
};

export function connectDb(dbType: string) {
  switch (dbType) {
    case "json":
      db.userStore = userJsonStore;
      db.categoryStore = categoryJsonStore;
      db.trailStore = trailJsonStore;
      break;
    case "mongo":
      connectMongo(db);
      break;
    default:
      db.userStore = userMemStore;
      db.categoryStore = categoryMemStore;
      db.trailStore = trailMemStore;
  }
}

// export const db = {
//   userStore: null,
//   categoryStore: null,
//   trailStore: null,

//   init(storeType) {
//     switch (storeType) {
//       case "json" :
//         this.userStore = userJsonStore;
//         this.categoryStore = categoryJsonStore;
//         this.trailStore = trailJsonStore;
//         break;
//       case "mongo" :
//         this.userStore = userMongoStore;
//         this.categoryStore = categoryMongoStore;
//         this.trailStore = trailMongoStore;
//         connectMongo();
//         break;
//       default :
//         this.userStore = userMemStore;
//         this.categoryStore = categoryMemStore;
//         this.trailStore = trailMemStore;
//     }
//   }
// };
