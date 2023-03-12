CREATE TABLE order_products (
  id SERIAL PRIMARY KEY,
  order_id   bigint NOT NULL ,
  product_id bigint  NOT NULL , 
  quantity   INTEGER NOT NULL,
  FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
	)
  