"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Begin Route Handler */
const express_1 = __importDefault(require("express"));
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
const orderss_routes = express_1.default.Router();
orderss_routes.get('/', index);
orderss_routes.route('/:id').get(show);
exports.default = orderss_routes;
