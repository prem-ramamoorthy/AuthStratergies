import { hashPassword, verifyPassword } from "../crypto/hash.js";

export async function createPasswordHash(
  password: string
): Promise<string> {
  return hashPassword(password);
}

export async function comparePassword(
  password: string,
  storedHash: string
): Promise<boolean> {
  return verifyPassword(password, storedHash);
}
