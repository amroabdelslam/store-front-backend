"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const products_handler_1 = __importDefault(require("./src/handlers/products_handler"));
const orders_handler_1 = __importDefault(require("./src/handlers/orders_handler"));
const orderss_handler_1 = __importDefault(require("./src/handlers/orderss_handler"));
const destroy_handler_1 = __importDefault(require("./src/handlers/destroy_handler"));
const users_handler_1 = __importDefault(require("./src/handlers/users_handler"));
const rawdata_handler_1 = __importDefault(require("./src/handlers/rawdata_handler"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Route to root path /
app.get('/', function (req, res) {
    res.send('Hello World!');
    res.status(200);
});
app.use((0, cors_1.default)());
// add json bodyParser
app.use(body_parser_1.default.json());
// console log all requests
app.use((0, morgan_1.default)('short'));
// Routers;
app.use('/product', products_handler_1.default);
app.use('/order', orders_handler_1.default);
app.use('/user', users_handler_1.default);
app.use('/destroy', destroy_handler_1.default);
app.use('/rawdata', rawdata_handler_1.default);
app.use('/orders', orderss_handler_1.default);
exports.default = app;
