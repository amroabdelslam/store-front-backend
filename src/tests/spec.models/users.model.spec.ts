import { User, UsersStore } from '../../models/users.model';
import jwt from 'jsonwebtoken';
import { env } from 'process';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import supertest from 'supertest';
import app from '../../app';
import db from '../../providers/database';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const request = supertest(app);

dotenv.config();
const store = new UsersStore();

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
        const Users: User = {
          username: 'Ali',
          firstname: 'Ali',
          lastname: 'Khaled',
          password: '123456',
        };

        const result = await store.create(Users);
        const token = jwt.sign({ Users: result }, `${env.TOKEN_SECRET}`);
        expect(
          bcrypt.compareSync(Users.password + env.BCRYPT_PASS, result.password)
        ).toEqual(true);
        expect(token).toBeDefined();
      } catch (error) {
        throw new Error(`Error ${error}`);
      }
    });

    it('Should Return One Users Depend BY ID', async () => {
      const result: User = await store.show('2');
      expect(result.username).toEqual('Ali');
      expect(result.password).not.toEqual('123456');
    });
  });
});

export const destroy = async () => {
  try {
    const conn = await db.connect();
    const sql =
      'TRUNCATE products,users,order_products,orders RESTART IDENTITY CASCADE';
    await conn.query(sql);
    conn.release;
    return;
  } catch (error) {
    throw new Error(`Coundn't truncat users and Orders. Error ${error}`);
  }
};
destroy;
