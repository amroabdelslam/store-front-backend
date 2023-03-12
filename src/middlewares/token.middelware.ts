import jwt from 'jsonwebtoken';

export type Tokentype = {
  id: number;
  username: string;
};

export const tokenPayload = (T: Tokentype): string => {
  const newtokenPayload = jwt.sign(T, `${process.env.TOKEN_SECRET}` as string, {
    expiresIn: '1d',
  });
  return newtokenPayload;
};
