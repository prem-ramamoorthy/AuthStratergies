import { createPasswordHash, comparePassword } from "./password.service";
import * as userService from "../../users/user.service";
import { User } from "../../users/user.model";

export async function register(
  email: string,
  password: string
): Promise<User> {
  const passwordHash = await createPasswordHash(password);
  return userService.registerUser(email, passwordHash);
}

export async function login(
  email: string,
  password: string
): Promise<User> {
  const user = await userService.getUserForLogin(email);

  if (!user || !user.isActive) {
    throw new Error("Invalid credentials");
  }

  const isValid = await comparePassword(password, user.passwordHash);

  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  return user;
}

export async function deleteExistingSession(userId: string): Promise<User | null> {
  return userService.deactivateUserSessions(userId);
}