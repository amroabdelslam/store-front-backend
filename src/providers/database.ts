import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const db: Pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  database:
    process.env.NODE_ENV === 'dev' ? process.env.DB_NAME : process.env.DB_TEST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export default db;
