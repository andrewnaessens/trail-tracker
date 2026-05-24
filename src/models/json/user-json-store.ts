import { User } from "../../types/trail-tracker-types.js";
import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const userJsonStore = {
  async getAllUsers() {
    await db.read();
    return db.data.users;
  },

  async addUser(user: User): Promise<User | null>  {
    await db.read();
    user._id = v4();
    db.data.users.push(user);
    await db.write();
    return user;
  },

  async getUserById(id: string): Promise<User | null> {
    await db.read();
    let u = db.data.users.find((user: User) => user._id === id);
    if (u === undefined) u = null;
    return u;
  },

  async getUserByEmail(email: string): Promise<User | null> {
    await db.read();
    let u = db.data.users.find((user: User) => user.email === email);
    if (u === undefined) u = null;
    return u;
  },

  async deleteUserById(id: string) {
    await db.read();
    const index = db.data.users.findIndex((user: User) => user._id === id);
    if (index !== -1) db.data.users.splice(index, 1);
    await db.write();
  },

  async deleteAll() {
    db.data.users = [];
    await db.write();
  },

  async updateUser(user: User, updatedUser: any) {
    user.firstName = updatedUser.firstName;
    user.lastName = updatedUser.lastName;
    user.email = updatedUser.email;
    user.password = updatedUser.password;
    await db.write();
  },
};
