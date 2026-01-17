import { generateSessionId } from "../crypto/random.js";
import { getSessionExpiry } from "../sessions/session.utils.js";
import * as sessionStore from "../sessions/session.store.js";
import { Session } from "../sessions/session.model.js";

export async function createUserSession(
  userId: string
): Promise<Session> {
  const sessionId = generateSessionId();
  const expiresAt = getSessionExpiry();

  return sessionStore.createSession(sessionId, userId, expiresAt);
}

export async function validateSession(
  sessionId: string
): Promise<Session | null> {
  const session = await sessionStore.findSessionById(sessionId);

  if (!session) return null;
  if (session.expiresAt < new Date()) return null;

  return session;
}

export async function destroySession(sessionId: string): Promise<void> {
  await sessionStore.deleteSession(sessionId);
}