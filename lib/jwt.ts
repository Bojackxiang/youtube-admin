import { sign, verify } from 'jsonwebtoken'

const SECRET = process.env.SECRET as string

export const encodePassword = (rawPassword: string) => {
  var token = sign(rawPassword, SECRET);
}

export const decodePassword = (encodedPassword: string) => {
  try {
    const result = verify(encodedPassword, SECRET);
    return result;
  } catch (error) {
    return ''
  }
}

export const passwordCompare = async(encodedPassword: string, rawPassword: string) => {
  try {
    const decodedPassword = decodePassword(encodedPassword);
    return decodedPassword === rawPassword;
  } catch (error) {
    return false;
  }
}



