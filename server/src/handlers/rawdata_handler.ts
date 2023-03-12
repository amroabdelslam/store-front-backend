/* Begin Route Handler */
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env, nextTick } from 'process';
import dotenv from 'dotenv';
import { User, UsersStore } from '../models/users.model';
import { Order, OrdersStore } from '../models/orders.model';
import { Product, ProductStore } from '../models/products_model';

dotenv.config();
const newUserStore = new UsersStore();
const newProductStore = new ProductStore();
const newOrdersStore = new OrdersStore();

const createRawData = async (_req: Request, res: Response) => {
  try {
    const products: Product = {
      name: 'Boot',
      price: 400,
      category: 'Winter Shoes',
    };
    const Orders: Order = {
      product_id: 1,
      quantity: 2,
      current_mood: 'Active',
      user_id: 1,
    };
    const Users: User = {
      username: 'Amro',
      firstname: 'Amr',
      lastname: 'Abdelslam',
      password: 'test123',
    };
    const newUser = await newUserStore.create(Users);
    await newProductStore.create(products);
    const token = jwt.sign({ Users: newUser }, `${env.TOKEN_SECRET}`);
    await newOrdersStore.create(Orders);
    res.json(`Successfully created User With Token :>> ${token}`);
    return token;
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const rawData_route: express.Router = express.Router();
rawData_route.post('/', createRawData, nextTick);

export default rawData_route;
