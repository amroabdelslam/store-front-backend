"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const process_1 = require("process");
const dotenv_1 = __importDefault(require("dotenv"));
const users_model_1 = require("../models/users.model");
const store = new users_model_1.UsersStore();
dotenv_1.default.config();
const authProcess = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const authtoken = authHeader ? authHeader.split(' ')[1] : '';
        if (!authtoken)
            throw new Error('Must Login First,Need Token');
        const verifiedToken = jsonwebtoken_1.default.verify(authtoken, process_1.env.TOKEN_SECRET);
        if (!verifiedToken)
            throw new Error('Must Login First,Invalid Token');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const user = await store.show(verifiedToken.tokenPayload.id);
        if (!user)
            throw new Error('Invalid User,Must Login First');
        // Add user to request
        res.locals.user = user;
        next();
    }
    catch (error) {
        res.status(401).json(`Error ${error}`);
    }
};
exports.default = authProcess;
