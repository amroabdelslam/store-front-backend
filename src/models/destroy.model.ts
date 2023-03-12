import db from '../providers/database';

export class empty {
  async emptyAll(): Promise<void> {
    try {
      const conn = await db.connect();
      const sql =
        'TRUNCATE products,users,order_products,orders RESTART IDENTITY';
      await conn.query(sql);
      conn.release;
      return;
    } catch (error) {
      throw new Error(`Coundn't truncat users and Orders. Error ${error}`);
    }
  }
}
