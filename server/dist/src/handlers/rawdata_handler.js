"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Begin Route Handler */
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const process_1 = require("process");
const dotenv_1 = __importDefault(require("dotenv"));
const users_model_1 = require("../models/users.model");
const orders_model_1 = require("../models/orders.model");
const products_model_1 = require("../models/products_model");
dotenv_1.default.config();
const newUserStore = new users_model_1.UsersStore();
const newProductStore = new products_model_1.ProductStore();
const newOrdersStore = new orders_model_1.OrdersStore();
const createRawData = async (_req, res) => {
    try {
        const products = {
            name: 'Boot',
            price: 400,
            category: 'Winter Shoes',
        };
        const Orders = {
            product_id: 1,
            quantity: 2,
            current_mood: 'Active',
            user_id: 1,
        };
        const Users = {
            username: 'Amro',
            firstname: 'Amr',
            lastname: 'Abdelslam',
            password: 'test123',
        };
        const newUser = await newUserStore.create(Users);
        await newProductStore.create(products);
        const token = jsonwebtoken_1.default.sign({ Users: newUser }, `${process_1.env.TOKEN_SECRET}`);
        await newOrdersStore.create(Orders);
        res.json(`Successfully created User With Token :>> ${token}`);
        return token;
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const rawData_route = express_1.default.Router();
rawData_route.post('/', createRawData, process_1.nextTick);
exports.default = rawData_route;
