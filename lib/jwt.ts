import { sign, verify } from "jsonwebtoken";

export const SECRET = process.env.SECRET as string;

export const encodePassword = (rawPassword: string) => {
  const token = sign(rawPassword, SECRET);
  return token;
};

export const decodePassword = async (encodedPassword: string) => {
  try {
    const result = verify(encodedPassword, SECRET);
    return result;
  } catch (error) {
    return "";
  }
};

export const decodeStoreId = async (token: string) => {
  try {
    const result = await verify(token, SECRET);
    return result;
  } catch (error) {
    return "";
  }
};

export const passwordCompare = async (
  jwtPassword: string,
  rawPassword: string
) => {
  try {
    const decodedPassword = await verify(jwtPassword, process.env.SECRET as string);
    return decodedPassword === rawPassword;
  } catch (error) {
    return false;
  }
};

export const generateToken = (payload: any) => {
  return sign(payload, SECRET);
};
