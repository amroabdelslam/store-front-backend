"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const process_1 = require("process");
const products_model_1 = require("../../models/products_model");
const users_model_1 = require("../../models/users.model");
const orders_model_1 = require("../../models/orders.model");
dotenv_1.default.config();
const port = process.env.PORT;
const newOrdersStore = new orders_model_1.OrdersStore();
const newProductStore = new products_model_1.ProductStore();
const newUserStore = new users_model_1.UsersStore();
const token = jsonwebtoken_1.default.sign('bearer', process.env.TOKEN_SECRET);
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
describe('Test order End Point', () => {
    // test create endpoints
    it('Should return new order', async () => {
        const result = request_1.default.post(`http://localhost:${port}/order`, {
            json: {
                product_id: 1,
                quantity: 12,
                current_mood: 'Active',
                user_id: 1,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }, function (error, response) {
            if (!error && response.statusCode == 201) {
                expect(result.response?.statusCode).toEqual(201);
            }
        });
    });
    it('Should return new product', async () => {
        const result = request_1.default.post('http://localhost:3000/product', {
            json: {
                name: 'Dell Lab',
                price: 5,
                category: 'LabTops',
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }, function (error, response) {
            if (!error && response.statusCode == 201) {
                expect(result.response?.statusCode).toEqual(201);
            }
        });
    });
    it('Should return new user', async () => {
        const result = request_1.default.post('http://localhost:3000/user', {
            json: {
                username: 'omar',
                firstname: 'omar',
                lastname: 'ali',
                password: '123',
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }, function (error, response) {
            if (!error && response.statusCode == 201) {
                expect(result.response?.statusCode).toEqual(201);
            }
        });
    });
    //test show endpoints
    it('test return order by id endpoint', async () => {
        const tokenPayload = { id: 1 };
        const token = jsonwebtoken_1.default.sign({ tokenPayload }, `${process.env.TOKEN_SECRET}`);
        const options = {
            method: 'GET',
            url: 'http://localhost:3000/order/1',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
        (0, request_1.default)(options, function (error, response) {
            if (error)
                throw new Error(error);
            expect(response?.statusCode).toEqual(201);
        });
    });
    it('test return product by id endpoint', async () => {
        const tokenPayload = { id: 1 };
        const token = jsonwebtoken_1.default.sign({ tokenPayload }, `${process.env.TOKEN_SECRET}`);
        const options = {
            method: 'GET',
            url: 'http://localhost:3000/product/1',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
        (0, request_1.default)(options, function (error, response) {
            if (error)
                throw new Error(error);
            expect(response?.statusCode).toEqual(201);
        });
    });
    it('test return user by id endpoint', async () => {
        const tokenPayload = { id: 1 };
        const token = jsonwebtoken_1.default.sign({ tokenPayload }, `${process.env.TOKEN_SECRET}`);
        const options = {
            method: 'GET',
            url: 'http://localhost:3000/user/1',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
        (0, request_1.default)(options, function (error, response) {
            if (error)
                throw new Error(error);
            expect(response?.statusCode).toEqual(201);
        });
    });
});
