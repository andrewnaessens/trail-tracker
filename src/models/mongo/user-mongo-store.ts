import { User } from "../../types/trail-tracker-types.js";
import { UserMongoose  } from "./user.js";
import Bcrypt from "bcrypt";

export const userMongoStore = {
  async getAllUsers(): Promise<User[]> {
    const users = await UserMongoose.find().lean();
    return users;
  },

  async getUserById(id: string): Promise<User | null> {
    if (id) {
      const user = await UserMongoose.findOne({ _id: id }).lean();
      return user;
    }
    return null;
  },

  async addUser(user: User): Promise<User | null> {
    // hash the password
    // https://coreui.io/answers/how-to-hash-passwords-with-bcrypt-in-nodejs/
    // amount of math a computer needs to do to hash the password 
    // resulting in time (10 is 2 to the power of 10)
    // the higher the salt rounds the more time needed
    const saltRounds = 10;
    // wait for Bycrpt to hast the password with the number of salt rounds
    user.password = await Bcrypt.hash(user.password, saltRounds);
    // save the user (create user object)
    const newUser = new UserMongoose(user);
    const userObj = await newUser.save();
    return this.getUserById(userObj._id);
  },

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await UserMongoose.findOne({ email: email }).lean();
    return user;
  },

  async deleteUserById(id: string) {
    try {
      await UserMongoose.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await UserMongoose.deleteMany({});
  },

  async updateUser(UserMongoose: any, user: User, updatedUser: any): Promise<User | null> {
    const userDoc = await UserMongoose.findOne({ _id: user["_id"] });
    userDoc.firstName = updatedUser.firstName;
    userDoc.lastName = updatedUser.lastName;
    userDoc.email = updatedUser.email;
    userDoc.password = updatedUser.password;
    await userDoc.save();
    return updatedUser;
  },
};

// export const userStore = {
//   async find(): Promise<User[]> {
//     const users = await UserMongoose.find().lean();
//     return users;
//   },

//   async findOne(id: string): Promise<User | null> {
//     if (id) {
//       const user = await UserMongoose.findOne({ _id: id }).lean();
//       return user;
//     }
//     return null;
//   },

//   async add(user: any): Promise<User | null> {
//     const newUser = new UserMongoose(user);
//     const userObj = await newUser.save();
//     return userObj;
//   },

//   async findBy(email: string): Promise<User | null> {
//     const user = await UserMongoose.findOne({ email: email }).lean();
//     return user;
//   },

//   async deleteOne(id: string) {
//     try {
//       await UserMongoose.deleteOne({ _id: id });
//     } catch (error) {
//       console.log("bad id");
//     }
//   },

//   async delete() {
//     await UserMongoose.deleteMany({});
//   },
// };