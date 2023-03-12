# Storefront Backend Project

## Getting Started

## Table of Contents

- [Project Title](#Storefront-Backend-Project)
- [Description](#Description)
- [Features](#Features)
- [Required Technologies](#Required-Technologies)
- [Steps to Completion](#Steps-to-Completion)
- [Run Store Program and Test](#run-Program)


## Description

This Project is "Online Storefront " to showcase products of stakeholders.Use Nodjs Technology with Express - RESTFULL API - Postgres sql and JWT security.

## Features

- **Usability** :
  Easy to shown one - all products by passing url.
- **Quality**
  Best practices by using Code formatting .
- **flexiblity**
  easy to add - update - delete products.
- **Security**
  Hashing Password and transfering data between front and backend.

## Required Technologies

application use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing
- Typescript for write code
- Prettier and Eslint for code formatting and analyzing code

## Steps to Completion

### 1. Plan to Meet Requirements

**RESTFUL Routes**:

- products_handler.
- ordrers_handler.
- users_handeler.
- destroy_handler.

**Postgres Database**:

- Database name : shopping.
- Database user : shopping_user.
- Tables : products - users - orders.

**Utilites**

- authentication Module.

**Models**

- products_model.
- ordrers_model.
- users_model.

### 2. DB Creation and Migrations

**DataBase**

- Database name : shopping
- DataBase Test : shopping_test
- Database user : shopping_user

**Code**

- CREATE USER shopping_user WITH PASSWORD 'password123';
- CREATE DATABASE shopping_db;
- GRANT ALL PRIVILEGES ON DATABASE shopping_db TO shopping_user1;
- GRANT ALL ON SCHEMA PUBLIC TO shopping_user1;
- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO  shopping_user1;

**Tables Migration**

- Tables : products - users - orders

  **Create SQL**

  - db-migrate create products --sql-file
  - db-migrate create users --sql-file
  - db-migrate create orders --sql-file
  - db-migrate create order_products --sql-file
  
  **Tables columns SQL Migration**

  - CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(65) NOT NULL,
  price integer NOT NULL,
  category VARCHAR(50)
  );
  - DROP TABLE products;

  - CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50)NOT NULL,
  firstname VARCHAR(50),
  lastname VARCHAR(50),
  password VARCHAR(255)NOT NULL
  );
 - DROP TABLE users;

 - DROP TYPE mood;
 - CREATE TYPE mood AS ENUM('Active','Complete');
  CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id BIGINT,
  current_mood mood NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
  );
 - DROP TABLE orders;

 - CREATE TABLE order_products (
  id SERIAL PRIMARY KEY,
  order_id   bigint NOT NULL ,
  product_id bigint  NOT NULL , 
  quantity   INTEGER NOT NULL,
  FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
	)
  
 - DROP TABLE order_products;
### 3. Models

One model for each database table.

**Products Model**

- import db products from database module
- export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};
- export class ProductStore that have:-
- index function(return all products)
- show function(return one product by id)
- create function(create new product)
- patch function(update product by id )
- delete function(delete product by id )

**Orders Model**

- import db orders from database module
- export type Order = {
  id?: number;
  product_id: number;
  quantity: number;
  current_mood?: string;
  user_id: number;
};
- export class OrdersStore that have:-
- index function(return all Orders)
- show function(return one Order by id)
- create function(create new Order)
- patch function(update Order by id )
- delete function(delete Order by id )
- truncate function(delete all data in Ordertable )

**users Model**

- import db Users from database module
- import bcrypt and { env } and dotenv
- open dotenv for configuration
- export type User = {
  id?: number;
  username: string;
  firstname?: string;
  lastname?: string;
  password: string;
  password_digest?: string;
};
- index function(return all Users)
- show function(return one User by id)
- create function(create new User)
- patch function(update User by id )
- delete function(delete User by id )
- authenticate function(authenticate user's login )

### 4. Express Handlers

**Products Handler**

- import express, { Request, Response } from 'express'
- import authProcess from 'middlewares/auth.middleware'
- import { Product, ProductStore } from 'models/products_model' folder
- creat store as new instans from ProductStore class

- store.index function(return all Products)
- store.show function(return one Product by id)
- store.create function(create new Product)
- store.patch function(update Product by id )
- store.delete function(delete Product by id )
- define Products_routes as  express.Router

        /* Endpoints */
- products_routes.post('/', authProcess, create);
- products_routes.get('/', authProcess, index);
- products_routes
  .route('/:id')
  .get(authProcess, show)
  .patch(authProcess, update)
  .delete(authProcess, destroy);

- then export (Products_routes) endpoint route

**Orders Handler**

- import express, { Request, Response } from 'express'
- import authProcess from 'middlewares/auth.middleware'
- import { Order, OrdersStore } from 'models/orders.model' folder
- creat store as new instans from OrdersStore class

- store.index function(return all Orders)
- store.show function(return one Order by id)
- store.create function(create new Order)
- store.patch function(update Order by id )
- store.delete function(delete Order by id )
- define orders_routes as  express.Router

        /* Endpoints */
- orders_routes.post('/', authProcess, create);
- orders_routes.get('/', authProcess, index);
- orders_routes
  .route('/:id')
  .get(authProcess, show)
  .patch(authProcess, update)
  .delete(authProcess, destroy);
- then export (orders_routes) endpoint route

**Users Handler**

- import express, { Request, Response } from 'express'
- import { Order, OrdersStore } from 'models/orders.model' folder
- import jsonwebtoken and process.env 
- import authProcess from 'middlewares/auth.middleware'

- create store as new instans from UsersStore class
- store.index function(return all Users)
- store.show function(return one User by id)
- store.create function(create new User)
- store.patch function(update User by id )
- store.delete function(delete User by id )
- store.authenticate function(authenticate user's login 

           /* Endpoints */
- define users_routes as  express.Router
- users_routes.get('/', authProcess, index);
- users_routes.get('/:id', authProcess, show);
- users_routes.patch('/:id', authProcess, update);
- users_routes.post('/', createUser);
- users_routes.post('/register', createUser);
- users_routes.post('/login', authProcess, login);
- users_routes.delete('/:id', authProcess, destroy);

- then export (users_routes) endpoint route

### 5. JWTs

               /** Security map **/
- Begin all route with check token except get one or all products
- all operations on orders DB or Users need Auth process
- check auth with routes by middelware authprocess and verify token if ok continue else need login message  
- when login success create new token
- when create new user also create new token and secure session

      /* authentication process */
- authentication process with all operation by 
- import middelware(authProcess) from '/middlewares/auth.middleware'
- that verify token to ensure from user privileges to do this operation 
- authHeader= req.headers.authorization
- authtoken=authHeader.split(' ')[1] : ''
- verifiedToken = jwt.verify(authtoken, env.TOKEN_SECRET)
- res.locals.userData = verifiedToken;
  
       /* Create New User and Login authentication */

                <<< hashing process >>> 
- pepper = env.BCRYPT_PASS
- salt= env.SALT_ROUND
- passwordHash = bcrypt.hashSync(password + pepper,salt))
- sql : 'INSERT INTO users(username,firstname,lastname,password) VALUES($1,$2,$3,$4) RETURNING *'

    <<login verify token >>
-bcrypt.compareSync(U.password + env.BCRYPT_PASS, user_pass)

# run Program

       /*scripts*/ 
- config.json 
- "scripts": {
  -   "watch": "tsc-watch --esModuleInterop src/server.ts --outDir ./dist --onSuccess \"node ./dist/server.js\"",
  -  "build": "npx tsc",
  -  "jasmine": "npm run build && jasmine",
  - "lint": "eslint ./**/*.ts",
  - "prettier": "prettier --config .prettierrc ./**/*.{js,ts} --write",
  - "test": "npm run build && npm run prettier && npm run lint && jasmine",
  -  "start": "nodemon src/server.ts --watch",
  -   "dev": "nodemon --exec ts-node src/server.ts"
  - in windows run cmd.exe /k " cd\ & D: & cd Program Files\PostgreSQL\15\bin\&psql -h localhost -U postgres -d postgres -p 5432"
  - Then \c shopping  to show tables in shopping DATABASE after evey operation