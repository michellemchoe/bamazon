DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
    item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price DECIMAL(12,2),
    stock_quantity INTEGER,
    PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Apple", "Produce", 0.79, 10);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Banana", "Produce", 0.19, 10);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Cat", "Pets", 100, 3);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Dog", "Pets", 150, 2);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Eye Drops", "Pharmacy", 8, 6);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Fencing", "Home Improvement", 30, 100);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Grappling Hook", "Outdoors", 100, 8);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Ham", "Meat", 10, 4);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Ice Cream", "Frozen Foods", 4, 9);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Jump Rope", "Fitness", 8, 3);
