CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50)NOT NULL,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    password  VARCHAR(255)NOT NULL
);