"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Begin Route Handler */
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const orders_model_1 = require("../models/orders.model");
const store = new orders_model_1.OrdersStore();
//show qll orders
const index = async (req, res) => {
    const orders = await store.index();
    res.json(orders);
};
//show order by id
const show = async (req, res) => {
    const Orders = await store.show(req.params.id);
    res.json(Orders);
};
//create new order
const create = async (req, res) => {
    try {
        const Orders = {
            product_id: req.body.product_id,
            quantity: req.body.quantity,
            current_mood: req.body.current_mood,
            user_id: req.body.user_id,
        };
        const newOrders = await store.create(Orders);
        res.status(201);
        res.json(newOrders);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
//update order by id
const update = async (req, res) => {
    const Orders = {
        product_id: req.body.product_id,
        quantity: req.body.quantity,
        current_mood: req.body.current_mood,
        user_id: req.body.user_id,
    };
    const newOrders = await store.patch(Orders, req.params.id);
    res.json(newOrders);
};
// delete order by id
const destroy = async (req, res) => {
    const Orders = await store.delete(req.params.id);
    res.json(Orders);
};
// orders routes Endpoints
const orders_routes = express_1.default.Router();
orders_routes.post('/', create);
orders_routes.get('/', auth_middleware_1.default, index);
orders_routes
    .route('/:id')
    .get(auth_middleware_1.default, show)
    .patch(auth_middleware_1.default, update)
    .delete(auth_middleware_1.default, destroy);
exports.default = orders_routes;
