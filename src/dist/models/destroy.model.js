"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.empty = void 0;
const database_1 = __importDefault(require("../providers/database"));
class empty {
    async emptyAll() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'TRUNCATE products,users,order_products,orders RESTART IDENTITY';
            await conn.query(sql);
            conn.release;
            return;
        }
        catch (error) {
            throw new Error(`Coundn't truncat users and Orders. Error ${error}`);
        }
    }
}
exports.empty = empty;
