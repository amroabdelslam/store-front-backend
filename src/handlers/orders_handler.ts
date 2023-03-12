/* Begin Route Handler */
import express, { Request, Response } from 'express';
import authProcess from '../middlewares/auth.middleware';
import { Order, OrdersStore } from '../models/orders.model';

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
//create new order
const create = async (req: Request, res: Response) => {
  try {
    const Orders: Order = {
      product_id: req.body.product_id as number,
      quantity: req.body.quantity,
      current_mood: req.body.current_mood,
      user_id: req.body.user_id,
    };
    const newOrders = await store.create(Orders);
    res.status(201);
    res.json(newOrders);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
//update order by id
const update = async (req: Request, res: Response) => {
  const Orders: Order = {
    product_id: req.body.product_id,
    quantity: req.body.quantity,
    current_mood: req.body.current_mood,
    user_id: req.body.user_id,
  };
  const newOrders = await store.patch(Orders, req.params.id);
  res.json(newOrders);
};
// delete order by id
const destroy = async (req: Request, res: Response) => {
  const Orders = await store.delete(req.params.id);
  res.json(Orders);
};

// orders routes Endpoints
const orders_routes: express.Router = express.Router();
orders_routes.post('/', create);
orders_routes.get('/', authProcess, index);

orders_routes
  .route('/:id')
  .get(authProcess, show)
  .patch(authProcess, update)
  .delete(authProcess, destroy);

export default orders_routes;
