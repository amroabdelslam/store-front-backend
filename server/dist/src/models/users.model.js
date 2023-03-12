"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersStore = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../providers/database"));
const process_1 = require("process");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class UsersStore {
    // Return All Users
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get Users ${err}`);
        }
    }
    // Return User BY ID
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users WHERE id=$1';
            const result = await conn.query(sql, [id]);
            conn.release;
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Couldn't Find User ${id}. Error ${err}`);
        }
    }
    // Create New User
    async create(U) {
        try {
            const conn = await database_1.default.connect();
            const pepper = process_1.env.BCRYPT_PASS;
            const salt = process_1.env.SALT_ROUND;
            const passwordHash = bcrypt_1.default.hashSync(U.password + pepper, parseInt(`${salt}`));
            const sql = 'INSERT INTO users(username,firstname,lastname,password) VALUES($1,$2,$3,$4) RETURNING *';
            const result = await conn.query(sql, [
                U.username,
                U.firstname,
                U.lastname,
                passwordHash,
            ]);
            conn.release;
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Cannot Create User ${error} `);
        }
    }
    // Login User
    async authenticate(U) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users WHERE username=($1)';
            const result = await conn.query(sql, [U.username]);
            const user_pass = result.rows[0].password;
            if (!bcrypt_1.default.compareSync(U.password + process_1.env.BCRYPT_PASS, user_pass)) {
                throw new Error('Invalid password');
            }
            conn.release;
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Error ${err}`);
        }
    }
    // Update User
    async patch(U, id) {
        try {
            const conn = await database_1.default.connect();
            const pepper = process_1.env.BCRYPT_PASS;
            const salt = process_1.env.SALT_ROUND;
            const passwordHash = bcrypt_1.default.hashSync(U.password + pepper, parseInt(`${salt}`));
            const sql = 'UPDATE users SET username=$1, firstname = $2,lastname=$3,password=$4 WHERE id=$5 RETURNING *';
            const result = await conn.query(sql, [
                U.username,
                U.firstname,
                U.lastname,
                passwordHash,
                id,
            ]);
            conn.release;
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Cannot Update User ${error}`);
        }
    }
    // Delete User
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM users WHERE id=($1)RETURNING * ';
            const result = await conn.query(sql, [id]);
            conn.release;
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Coundn't delet User ${id}. Error ${error}`);
        }
    }
}
exports.UsersStore = UsersStore;
