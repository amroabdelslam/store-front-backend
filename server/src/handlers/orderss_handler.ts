/* Begin Route Handler */
import express, { Request, Response } from 'express';
import { OrdersStore } from '../models/orders.model';

const store = new OrdersStore();
//show qll orders
const index = async (req: Request, res: Response) => {
  const orders = await store.index();
  res.json(orders);
};
//show order by id
const show = async (req: Request, res: Response) => {
  const Orders = await store.show(req.params.id);
  res.json(Orders);
};

const orderss_routes: express.Router = express.Router();

orderss_routes.get('/', index);
orderss_routes.route('/:id').get(show);

export default orderss_routes;
