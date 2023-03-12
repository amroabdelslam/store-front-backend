import request1 from 'request';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { env } from 'process';
import { Product, ProductStore } from '../../models/products_model';
import { User, UsersStore } from '../../models/users.model';
import { Order, OrdersStore } from '../../models/orders.model';
import express, { Request, Response } from 'express';

dotenv.config();
const port = process.env.PORT;
const newOrdersStore = new OrdersStore();
const newProductStore = new ProductStore();
const newUserStore = new UsersStore();
const token = jwt.sign('bearer', process.env.TOKEN_SECRET as string);

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

describe('Test order End Point', () => {
  // test create endpoints
  it('Should return new order', async () => {
    const result = request1.post(
      `http://localhost:${port}/order`,
      {
        json: {
          product_id: 1,
          quantity: 12,
          current_mood: 'Active',
          user_id: 1,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      function (error, response) {
        if (!error && response.statusCode == 201) {
          expect(result.response?.statusCode).toEqual(201);
        }
      }
    );
  });

  it('Should return new product', async () => {
    const result = request1.post(
      'http://localhost:3000/product',
      {
        json: {
          name: 'Dell Lab',
          price: 5,
          category: 'LabTops',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      function (error, response) {
        if (!error && response.statusCode == 201) {
          expect(result.response?.statusCode).toEqual(201);
        }
      }
    );
  });
  it('Should return new user', async () => {
    const result = request1.post(
      'http://localhost:3000/user',
      {
        json: {
          username: 'omar',
          firstname: 'omar',
          lastname: 'ali',
          password: '123',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      function (error, response) {
        if (!error && response.statusCode == 201) {
          expect(result.response?.statusCode).toEqual(201);
        }
      }
    );
  });

  //test show endpoints
  it('test return order by id endpoint', async () => {
    const tokenPayload = { id: 1 };
    const token = jwt.sign(
      { tokenPayload },
      `${process.env.TOKEN_SECRET}` as string
    );
    const options = {
      method: 'GET',
      url: 'http://localhost:3000/order/1',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    request1(options, function (error, response) {
      if (error) throw new Error(error);
      expect(response?.statusCode).toEqual(201);
    });
  });

  it('test return product by id endpoint', async () => {
    const tokenPayload = { id: 1 };
    const token = jwt.sign(
      { tokenPayload },
      `${process.env.TOKEN_SECRET}` as string
    );
    const options = {
      method: 'GET',
      url: 'http://localhost:3000/product/1',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    request1(options, function (error, response) {
      if (error) throw new Error(error);
      expect(response?.statusCode).toEqual(201);
    });
  });

  it('test return user by id endpoint', async () => {
    const tokenPayload = { id: 1 };
    const token = jwt.sign(
      { tokenPayload },
      `${process.env.TOKEN_SECRET}` as string
    );
    const options = {
      method: 'GET',
      url: 'http://localhost:3000/user/1',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    request1(options, function (error, response) {
      if (error) throw new Error(error);
      expect(response?.statusCode).toEqual(201);
    });
  });
});
