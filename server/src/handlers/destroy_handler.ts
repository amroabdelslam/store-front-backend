/* Begin Route Handler */
import express, { Request, Response } from 'express';
import { empty } from '../models/destroy.model';

const newEmpty = new empty();

const destroy = async (req: Request, res: Response) => {
  try {
    const result = await newEmpty.emptyAll();
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const empty_route: express.Router = express.Router();
empty_route.delete('/', destroy);

export default empty_route;
