import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../../config/env';

export function generateToken(payload: object, expiresIn: string | number = '1h'): string {
    const options: SignOptions = { expiresIn: expiresIn as any };
    return jwt.sign(payload, env.JWT_SECRET, options);
}

export function verifyToken(token: string): object | string {
    try {
        return jwt.verify(token, env.JWT_SECRET);
    }
    catch (error) {
        throw new Error('Invalid token');
    }
}

export function generateRefreshToken(payload: object, expiresIn: string | number = '7d'): string {
    const options: SignOptions = { expiresIn: expiresIn as any };
    return jwt.sign(payload, env.REFRESH_SECRET, options);
}

export function verifyRefreshToken(token: string): object | string {
    try {
        return jwt.verify(token, env.REFRESH_SECRET);
    }
    catch (error) {
        throw new Error('Invalid refresh token');
    }
}