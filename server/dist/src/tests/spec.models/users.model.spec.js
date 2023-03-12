"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = void 0;
const users_model_1 = require("../../models/users.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const process_1 = require("process");
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../app"));
const database_1 = __importDefault(require("../../providers/database"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const request = (0, supertest_1.default)(app_1.default);
dotenv_1.default.config();
const store = new users_model_1.UsersStore();
describe('User Model Exist', () => {
    it('should have a createUser  method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have a get all Users method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a getUserById method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a update User method', () => {
        expect(store.patch).toBeDefined();
    });
    it('should have a deleteUser method', () => {
        expect(store.delete).toBeDefined();
    });
    it('should have a LoginUser method', () => {
        expect(store.authenticate).toBeDefined();
    });
});
describe('', () => {
    describe('User Model Operations', () => {
        it('Should Create New User', async () => {
            try {
                const Users = {
                    username: 'Ali',
                    firstname: 'Ali',
                    lastname: 'Khaled',
                    password: '123456',
                };
                const result = await store.create(Users);
                const token = jsonwebtoken_1.default.sign({ Users: result }, `${process_1.env.TOKEN_SECRET}`);
                expect(bcrypt_1.default.compareSync(Users.password + process_1.env.BCRYPT_PASS, result.password)).toEqual(true);
                expect(token).toBeDefined();
            }
            catch (error) {
                throw new Error(`Error ${error}`);
            }
        });
        it('Should Return One Users Depend BY ID', async () => {
            const result = await store.show('2');
            expect(result.username).toEqual('Ali');
            expect(result.password).not.toEqual('123456');
        });
    });
});
const destroy = async () => {
    try {
        const conn = await database_1.default.connect();
        const sql = 'TRUNCATE products,users,order_products,orders RESTART IDENTITY CASCADE';
        await conn.query(sql);
        conn.release;
        return;
    }
    catch (error) {
        throw new Error(`Coundn't truncat users and Orders. Error ${error}`);
    }
};
exports.destroy = destroy;
exports.destroy;
