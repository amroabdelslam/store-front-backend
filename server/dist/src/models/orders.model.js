"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersStore = void 0;
const database_1 = __importDefault(require("../providers/database"));
class OrdersStore {
    //index function(return all Orders)
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT order_id,user_id,product_id,quantity,price,category,current_mood FROM order_products INNER JOIN orders ON order_products.order_id =orders.id INNER JOIN products ON order_products.product_id = products.id';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get Orders ${err}`);
        }
    }
    //show function(return one Order by id)
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT order_id,user_id,product_id,quantity,price,category,current_mood FROM order_products INNER JOIN orders ON order_products.order_id =($1) INNER JOIN products ON order_products.product_id = products.id';
            const result = await conn.query(sql, [id]);
            conn.release;
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Couldn't Find Orders ${id}. Error ${err}`);
        }
    }
    //create function(create new Order)
    async create(O) {
        try {
            const conn = await database_1.default.connect();
            const result0 = await conn.query('INSERT INTO orders(user_id,current_mood) VALUES ($1,$2) RETURNING id', [O.user_id, O.current_mood]);
            conn.release;
            const sql = `INSERT INTO order_products(order_id,product_id,quantity) VALUES(${result0.rows[0].id},${O.product_id.toString()},${O.quantity.toString()})RETURNING *`;
            const result = await conn.query(sql);
            conn.release;
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Couldn't Create new Order. Error ${err}`);
        }
    }
    //patch function(update Order by id )
    async patch(O, id) {
        try {
            const conn = await database_1.default.connect();
            await conn.query(`UPDATE orders SET user_id=${O.user_id},current_mood='${O.current_mood}' WHERE id=${1} RETURNING *`);
            conn.release;
            const sql = `UPDATE order_products SET product_id =${O.product_id.toString()},quantity=${O.quantity.toString()} WHERE order_id=${1} RETURNING *`;
            await conn.query(sql);
            conn.release;
            const result = await conn.query('SELECT * FROM order_products JOIN orders ON order_products.order_id = orders.id WHERE order_id=$1', [id]);
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Cannot get Orders ${error}`);
        }
    }
    //delete function(delete Order by id )
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const result = await conn.query('DELETE FROM Order_products WHERE order_id=($1) RETURNING * ', [id]);
            conn.release;
            await conn.query('DELETE FROM orders WHERE id=($1) RETURNING * ', [id]);
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Coundn't delet Orders ${id}. Error ${error}`);
        }
    }
    //truncate function(delete all data in Ordertable )
    async empty() {
        try {
            const conn = await database_1.default.connect();
            const result = await conn.query('TRUNCATE  order_products,orders RESTART IDENTITY');
            conn.release;
            await conn.query('TRUNCATE orders CASCADE');
            conn.release;
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Coundn't truncat Orders. Error ${error}`);
        }
    }
}
exports.OrdersStore = OrdersStore;
