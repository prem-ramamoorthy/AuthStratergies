import { env } from '../../config/env';

export function getSessionExpiry(): Date {
  const expires = new Date();
  expires.setSeconds(expires.getSeconds() + env.SESSION_DURATION_SECONDS);
  return expires;
}