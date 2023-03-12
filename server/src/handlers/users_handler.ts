import express, { Request, Response } from 'express';
import { User, UsersStore } from '../models/users.model';
import jwt from 'jsonwebtoken';
import { env } from 'process';
import authProcess from '../middlewares/auth.middleware';

const newUserStore = new UsersStore();

//Display All Users
const index = async (req: Request, res: Response) => {
  const users = await newUserStore.index();
  res.json(users);
};

// Display user by id
const show = async (req: Request, res: Response) => {
  const users = await newUserStore.show(req.params.id);
  res.json(users);
};
// Create New User
const createUser = async (req: Request, res: Response) => {
  try {
    const Users: User = {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };
    const newUser = await newUserStore.create(Users);
    const tokenPayload = {
      id: newUser.id,
      username: newUser.username,
    };
    const token = jwt.sign(
      { tokenPayload },
      `${process.env.TOKEN_SECRET}` as string,
      {
        expiresIn: '1d',
      }
    );
    res.json(`Successfully created User With Token :>> ${token}`);
    return token;
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
// Login User
const login = async (req: Request, res: Response) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({
        error: 'Missing username or password',
      });
    }
    const users: User = {
      username: req.body.username,
      password: req.body.password,
    };
    const userLogin = await newUserStore.authenticate(users);
    const tokenPayload = {
      id: userLogin.id,
      username: userLogin.username,
    };
    const token = jwt.sign(
      { tokenPayload },
      `${process.env.TOKEN_SECRET}` as string,
      {
        expiresIn: '1d',
      }
    );
    console.log(token);

    res.json(`Verified Token User Logged:>> ${token}`);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
// update user
const update = async (req: Request, res: Response) => {
  const users: User = {
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
  };
  const newUser = await newUserStore.patch(users, req.params.id);
  const token = jwt.sign({ Users: newUser }, `${env.TOKEN_SECRET}`);
  res.json({ newUser, token });
};
// delets user
const destroy = async (req: Request, res: Response) => {
  const newUser = await newUserStore.delete(req.params.id);
  res.json(newUser);
};

// user routes
const users_routes = express.Router();
users_routes.get('/', authProcess, index);
users_routes.get('/:id', authProcess, show);

users_routes.patch('/:id', authProcess, update);
users_routes.post('/', createUser);
users_routes.post('/register', createUser);
users_routes.post('/login', login);

users_routes.delete('/:id', authProcess, destroy);

export default users_routes;
