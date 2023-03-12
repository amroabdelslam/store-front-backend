"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_model_1 = require("../models/users.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const process_1 = require("process");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const newUserStore = new users_model_1.UsersStore();
//Display All Users
const index = async (req, res) => {
    const users = await newUserStore.index();
    res.json(users);
};
// Display user by id
const show = async (req, res) => {
    const users = await newUserStore.show(req.params.id);
    res.json(users);
};
// Create New User
const createUser = async (req, res) => {
    try {
        const Users = {
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
        const token = jsonwebtoken_1.default.sign({ tokenPayload }, `${process.env.TOKEN_SECRET}`, {
            expiresIn: '1d',
        });
        res.json(`Successfully created User With Token :>> ${token}`);
        return token;
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
// Login User
const login = async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({
                error: 'Missing username or password',
            });
        }
        const users = {
            username: req.body.username,
            password: req.body.password,
        };
        const userLogin = await newUserStore.authenticate(users);
        const tokenPayload = {
            id: userLogin.id,
            username: userLogin.username,
        };
        const token = jsonwebtoken_1.default.sign({ tokenPayload }, `${process.env.TOKEN_SECRET}`, {
            expiresIn: '1d',
        });
        console.log(token);
        res.json(`Verified Token User Logged:>> ${token}`);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
// update user
const update = async (req, res) => {
    const users = {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
    };
    const newUser = await newUserStore.patch(users, req.params.id);
    const token = jsonwebtoken_1.default.sign({ Users: newUser }, `${process_1.env.TOKEN_SECRET}`);
    res.json({ newUser, token });
};
// delets user
const destroy = async (req, res) => {
    const newUser = await newUserStore.delete(req.params.id);
    res.json(newUser);
};
// user routes
const users_routes = express_1.default.Router();
users_routes.get('/', auth_middleware_1.default, index);
users_routes.get('/:id', auth_middleware_1.default, show);
users_routes.patch('/:id', auth_middleware_1.default, update);
users_routes.post('/', createUser);
users_routes.post('/register', createUser);
users_routes.post('/login', login);
users_routes.delete('/:id', auth_middleware_1.default, destroy);
exports.default = users_routes;
