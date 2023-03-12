import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { env } from 'process';
import dotenv from 'dotenv';
import { UsersStore } from '../models/users.model';

const store = new UsersStore();
dotenv.config();
const authProcess = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader: string | undefined = req.headers.authorization;
    const authtoken: string = authHeader ? authHeader.split(' ')[1] : '';
    if (!authtoken) throw new Error('Must Login First,Need Token');
    const verifiedToken = jwt.verify(authtoken, env.TOKEN_SECRET as string);
    if (!verifiedToken) throw new Error('Must Login First,Invalid Token');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = await store.show((verifiedToken as any).tokenPayload.id);
    if (!user) throw new Error('Invalid User,Must Login First');
    // Add user to request
    res.locals.user = user;
    next();
  } catch (error) {
    res.status(401).json(`Error ${error}`);
  }
};
export default authProcess;
