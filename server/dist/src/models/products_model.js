"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../providers/database"));
//index function(return all products)
class ProductStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get Products ${err}`);
        }
    }
    //show function(return one product by id)
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products WHERE id=$1';
            const result = await conn.query(sql, [id]);
            conn.release;
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Couldn't Find Product ${id}. Error ${err}`);
        }
    }
    //create function(create new product)
    async create(P) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO products(name,price,category) VALUES($1,$2,$3) RETURNING *';
            const result = await conn.query(sql, [P.name, P.price, P.category]);
            conn.release;
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Couldn't Creat Product ${P.name}. Error ${err}`);
        }
    }
    //patch function(update product by id )
    async patch(P, id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'UPDATE products SET name=$1, price = $2 WHERE id=$3 RETURNING *';
            const result = await conn.query(sql, [P.name, P.price, id]);
            conn.release;
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Cannot get Product ${error}`);
        }
    }
    // delete function(delete product by id )
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM products WHERE id=($1)RETURNING * ';
            const result = await conn.query(sql, [id]);
            conn.release;
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Coundn't delet Product ${id}. Error ${error}`);
        }
    }
}
exports.ProductStore = ProductStore;
