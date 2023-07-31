import bcrypt from "bcrypt";

export async function comparePassword(password: string, secret: string): Promise<boolean> {
  return bcrypt.compare(password, secret);
}
