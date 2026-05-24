import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { db } from "../models/db.js";
import { User } from "../types/trail-tracker-types.js";
import { Options } from "hapi-auth-jwt2";

const result = dotenv.config();

export function createToken(user: User) {
  const payload = {
    id: user._id,
    email: user.email,
  };
  const options = {
    algorithm: "HS256",
    expiresIn: "1h",
  } as any;
  const cookiePassword = process as any;
  return jwt.sign(payload, cookiePassword.env.cookie_password, options);
}

export function decodeToken(token: any) {
  const userInfo = {} as User;
  try {
    const cookiePassword = process as any;
    const decoded = jwt.verify(token, cookiePassword.env.cookie_password) as any;
    userInfo._id = decoded.id;
    userInfo.email = decoded.email;
  } catch (err: any) {
    console.log(err.message);
  }
  return userInfo;
}

export async function validate(decoded: any, request: Request) {
  const user = await db.userStore.getUserById(decoded.id);
  if (!user) {
    return { isValid: false };
  }
  return { isValid: true, credentials: user };
}
