import { jwtVerify, SignJWT } from 'jose';

export const signJwt = async (payload: { id: string; role: string }) => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = 'HS256';
    return new SignJWT(payload)
      .setProtectedHeader({ alg })
      .setExpirationTime('7d')
      .setIssuedAt()
      .setSubject(payload.role.toString())
      .sign(secret);
  } catch (error) {
    throw error;
  }
};

export const verifyJWT = async <T>(token: string): Promise<T> => {
  try {
    return (
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))
    ).payload as T;
  } catch (error) {
    console.log(error);
    throw new Error('Your token has expired');
  }
};
