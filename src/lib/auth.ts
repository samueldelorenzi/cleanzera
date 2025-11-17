import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

const SALT_ROUNDS = 12;
const PEPPER = process.env.PASSWORD_PEPPER || 'default-pepper-change-in-production';

export async function hashPassword(password: string): Promise<string> {
  const pepperedPassword = password + PEPPER;
  return bcrypt.hash(pepperedPassword, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const pepperedPassword = password + PEPPER;
  return bcrypt.compare(pepperedPassword, hash);
}

export async function createToken(userId: number, email: string): Promise<string> {
  return new SignJWT({ userId, email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch {
    return null;
  }
}
