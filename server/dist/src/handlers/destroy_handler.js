"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Begin Route Handler */
const express_1 = __importDefault(require("express"));
const destroy_model_1 = require("../models/destroy.model");
const newEmpty = new destroy_model_1.empty();
const destroy = async (req, res) => {
    try {
        const result = await newEmpty.emptyAll();
        res.json(result);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const empty_route = express_1.default.Router();
empty_route.delete('/', destroy);
exports.default = empty_route;
