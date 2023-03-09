-- MYSQL
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO users (username, password) VALUES
  ('usuario1', 'contraseña1'),
  ('usuario2', 'contraseña2');

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (name, price) VALUES
  ('Producto 1', 10.99),
  ('Producto 2', 5.50),
  ('Producto 3', 15.99),
  ('Producto 4', 7.50);


-- Postgresql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL
);

INSERT INTO users (username, password) VALUES
  ('usuario1', 'contraseña1'),
  ('usuario2', 'contraseña2');

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  price NUMERIC(10,2) NOT NULL
);

INSERT INTO products (name, price) VALUES
  ('Producto 1', 10.99),
  ('Producto 2', 5.50),
  ('Producto 3', 15.99),
  ('Producto 4', 7.50);
