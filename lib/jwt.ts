import { sign, verify } from "jsonwebtoken";

export const SECRET = process.env.SECRET as string;

export const encodePassword = (rawPassword: string) => {
  const token = sign(rawPassword, SECRET);
  return token;
};

export const decodePassword = (encodedPassword: string) => {
  try {
    const result = verify(encodedPassword, SECRET);
    return result;
  } catch (error) {
    return "";
  }
};

export const passwordCompare = async (
  encodedPassword: string,
  rawPassword: string
) => {
  try {
    const decodedPassword = decodePassword(encodedPassword);
    return decodedPassword === rawPassword;
  } catch (error) {
    return false;
  }
};

export const generateToken = (payload: any) => {
  return sign(payload, SECRET);
};
