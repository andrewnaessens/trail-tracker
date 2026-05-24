import { User } from "../../types/trail-tracker-types.js";
import { v4 } from "uuid";
import { UserSpecPlus } from "../joi-schemas";

let users = [] as any;

export const userMemStore = {
  async getAllUsers() {
    return users;
  },

  async addUser(user: User): Promise<User | null> {
    user._id = v4();
    users.push(user);
    return user;
  },

  async getUserById(id: string): Promise<User | null> {
    let user = users.find((user: User) => user._id === id);
    if (user == undefined) {
      user = null;
    }
    return user;
  },

  async getUserByEmail(email: string): Promise<User | null> {
    let user = users.find((user: User) => user.email === email);
    if (user == undefined) {
      user = null;
    }
    return user;
  },

  async deleteUserById(id: string) {
    const index = users.findIndex((user: User) => user._id === id);
    if (index != -1) users.splice(index, 1);
  },

  async deleteAll() {
    users = [];
  },

  async updateUser(user: User, updatedUser: any) {
    user.firstName = updatedUser.firstName;
    user.lastName = updatedUser.lastName;
    user.email = updatedUser.email;
    user.password = updatedUser.password;
  },
};
