"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Begin Route Handler */
const express_1 = __importDefault(require("express"));
const products_model_1 = require("../models/products_model");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const store = new products_model_1.ProductStore();
//show qll products
const index = async (req, res) => {
    try {
        const products = await store.index();
        res.json(products);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
//show product by id
const show = async (req, res) => {
    try {
        const products = await store.show(req.params.id);
        res.json(products);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
//create new product
const create = async (req, res) => {
    try {
        const products = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        };
        const newProduct = await store.create(products);
        res.status(201);
        res.json(newProduct);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
//update product by id
const update = async (req, res) => {
    try {
        const products = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        };
        const newProduct = await store.patch(products, req.params.id);
        res.json(newProduct);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
// delete product by id
const destroy = async (req, res) => {
    try {
        const Product = await store.delete(req.params.id);
        res.json(Product);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
// Products routes Endpoints
const products_routes = express_1.default.Router();
products_routes.post('/', auth_middleware_1.default, create);
products_routes.get('/', index);
products_routes
    .route('/:id')
    .get(show)
    .patch(auth_middleware_1.default, update)
    .delete(auth_middleware_1.default, destroy);
exports.default = products_routes;
