/* Begin Route Handler */
import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/products_model';
import authProcess from '../middlewares/auth.middleware';

const store = new ProductStore();

//show qll products
const index = async (req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
//show product by id
const show = async (req: Request, res: Response) => {
  try {
    const products = await store.show(req.params.id);
    res.json(products);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
//create new product
const create = async (req: Request, res: Response) => {
  try {
    const products: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };
    const newProduct = await store.create(products);
    res.status(201);
    res.json(newProduct);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
//update product by id
const update = async (req: Request, res: Response) => {
  try {
    const products: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };
    const newProduct = await store.patch(products, req.params.id);
    res.json(newProduct);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
// delete product by id
const destroy = async (req: Request, res: Response) => {
  try {
    const Product = await store.delete(req.params.id);
    res.json(Product);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

// Products routes Endpoints
const products_routes: express.Router = express.Router();
products_routes.post('/', authProcess, create);
products_routes.get('/', index);
products_routes
  .route('/:id')
  .get(show)
  .patch(authProcess, update)
  .delete(authProcess, destroy);

export default products_routes;
