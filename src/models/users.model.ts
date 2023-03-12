import bcrypt from 'bcrypt';
import db from '../providers/database';
import { env } from 'process';
import dotenv from 'dotenv';
dotenv.config();

export type User = {
  id?: number;
  username: string;
  firstname?: string;
  lastname?: string;
  password: string;
  password_digest?: string;
};

export class UsersStore {
  // Return All Users
  async index(): Promise<User[]> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get Users ${err}`);
    }
  }
  // Return User BY ID
  async show(id: string): Promise<User> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM users WHERE id=$1';
      const result = await conn.query(sql, [id]);
      conn.release;
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't Find User ${id}. Error ${err}`);
    }
  }
  // Create New User
  async create(U: User): Promise<User> {
    try {
      const conn = await db.connect();
      const pepper: string = env.BCRYPT_PASS as string;
      const salt: string | number = env.SALT_ROUND as unknown as number;
      const passwordHash = bcrypt.hashSync(
        U.password + pepper,
        parseInt(`${salt}`)
      );
      const sql =
        'INSERT INTO users(username,firstname,lastname,password) VALUES($1,$2,$3,$4) RETURNING *';
      const result = await conn.query(sql, [
        U.username,
        U.firstname,
        U.lastname,
        passwordHash,
      ]);
      conn.release;
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot Create User ${error} `);
    }
  }
  // Login User
  async authenticate(U: User): Promise<User> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM users WHERE username=($1)';
      const result = await conn.query(sql, [U.username]);
      const user_pass = result.rows[0].password as string;
      if (!bcrypt.compareSync(U.password + env.BCRYPT_PASS, user_pass)) {
        throw new Error('Invalid password');
      }
      conn.release;
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error ${err}`);
    }
  }
  // Update User
  async patch(U: User, id: string): Promise<User> {
    try {
      const conn = await db.connect();
      const pepper: string = env.BCRYPT_PASS as string;
      const salt: string | number = env.SALT_ROUND as unknown as number;
      const passwordHash = bcrypt.hashSync(
        U.password + pepper,
        parseInt(`${salt}`)
      );
      const sql =
        'UPDATE users SET username=$1, firstname = $2,lastname=$3,password=$4 WHERE id=$5 RETURNING *';
      const result = await conn.query(sql, [
        U.username,
        U.firstname,
        U.lastname,
        passwordHash,
        id,
      ]);
      conn.release;
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot Update User ${error}`);
    }
  }
  // Delete User
  async delete(id: string): Promise<User> {
    try {
      const conn = await db.connect();
      const sql = 'DELETE FROM users WHERE id=($1)RETURNING * ';
      const result = await conn.query(sql, [id]);
      conn.release;
      return result.rows[0];
    } catch (error) {
      throw new Error(`Coundn't delet User ${id}. Error ${error}`);
    }
  }
}
