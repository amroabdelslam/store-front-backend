import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import products_routes from './src/handlers/products_handler';
import orders_routes from './src/handlers/orders_handler';
import orderss_routes from './src/handlers/orderss_handler';
import empty_route from './src/handlers/destroy_handler';
import users_routes from './src/handlers/users_handler';
import rawData_route from './src/handlers/rawdata_handler';
import cors from 'cors';

const app: express.Application = express();

// Route to root path /
app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
  res.status(200);
});
app.use(cors());
// add json bodyParser
app.use(bodyParser.json());
// console log all requests
app.use(morgan('short'));

// Routers;
app.use('/product', products_routes);
app.use('/order', orders_routes);
app.use('/user', users_routes);
app.use('/destroy', empty_route);
app.use('/rawdata', rawData_route);
app.use('/orders', orderss_routes);

export default app;
