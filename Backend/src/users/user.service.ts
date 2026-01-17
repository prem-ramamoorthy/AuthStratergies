import * as userRepo from "./user.repository.js";
import { User } from "./user.model.js";

export async function registerUser(
  email: string,
  passwordHash: string
): Promise<User> {
  return userRepo.createUser(email, passwordHash);
}

export async function getUserForLogin(
  email: string
): Promise<User | null> {
  return userRepo.findUserByEmail(email);
}

export async function deactivateUserSessions(
  userId: string
): Promise<User | null> {
  return userRepo.deactivateSessionsByUserId(userId);
}