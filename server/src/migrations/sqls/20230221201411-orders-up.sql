CREATE TYPE mood AS ENUM('Active','Complete');
  CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id BIGINT,
  current_mood mood NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
  );