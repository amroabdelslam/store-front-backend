import db from '../providers/database';

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};
//index function(return all products)
export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get Products ${err}`);
    }
  }
  //show function(return one product by id)
  async show(id: string): Promise<Product> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM products WHERE id=$1';
      const result = await conn.query(sql, [id]);
      conn.release;
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't Find Product ${id}. Error ${err}`);
    }
  }
  //create function(create new product)
  async create(P: Product): Promise<Product> {
    try {
      const conn = await db.connect();
      const sql =
        'INSERT INTO products(name,price,category) VALUES($1,$2,$3) RETURNING *';
      const result = await conn.query(sql, [P.name, P.price, P.category]);
      conn.release;
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't Creat Product ${P.name}. Error ${err}`);
    }
  }
  //patch function(update product by id )
  async patch(P: Product, id: string): Promise<Product> {
    try {
      const conn = await db.connect();
      const sql =
        'UPDATE products SET name=$1, price = $2 WHERE id=$3 RETURNING *';
      const result = await conn.query(sql, [P.name, P.price, id]);
      conn.release;
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot get Product ${error}`);
    }
  }
  // delete function(delete product by id )
  async delete(id: string): Promise<Product> {
    try {
      const conn = await db.connect();
      const sql = 'DELETE FROM products WHERE id=($1)RETURNING * ';
      const result = await conn.query(sql, [id]);
      conn.release;
      return result.rows[0];
    } catch (error) {
      throw new Error(`Coundn't delet Product ${id}. Error ${error}`);
    }
  }
}
