import { env } from '../../config/env.js';

export function getSessionExpiry(): Date {
  const expires = new Date();
  expires.setSeconds(expires.getSeconds() + env.SESSION_DURATION_SECONDS);
  return expires;
}