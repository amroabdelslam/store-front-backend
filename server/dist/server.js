"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const process_1 = require("process");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process_1.env.PORT || 80;
// Main route can be accessed without a token
const address = `http://localhost:${port}`;
app_1.default.listen(port, function () {
    console.log(`starting app on: ${address}`);
});
