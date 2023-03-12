"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenPayload = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenPayload = (T) => {
    const newtokenPayload = jsonwebtoken_1.default.sign(T, `${process.env.TOKEN_SECRET}`, {
        expiresIn: '1d',
    });
    return newtokenPayload;
};
exports.tokenPayload = tokenPayload;
