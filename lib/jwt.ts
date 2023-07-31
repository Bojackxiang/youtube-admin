import { sign } from "jsonwebtoken";

export const SECRET = process.env.SECRET as string;

export const generateToken = (payload: any) => {
  return sign(payload, SECRET);
};
