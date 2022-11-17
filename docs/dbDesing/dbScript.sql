#DROP DATABASE todo_musica;
CREATE DATABASE IF NOT EXISTS todo_musica;

USE todo_musica;

CREATE TABLE IF NOT EXISTS address_type(
        id INT AUTO_INCREMENT NOT NULL,
        type VARCHAR(25) NOT NULL, 
        PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS addresses(
        id INT AUTO_INCREMENT NOT NULL,
        way_type VARCHAR(25) NOT NULL, 
        address VARCHAR(50) NOT NULL, 
        a_number INT,
        additional_address VARCHAR (50),
        locality VARCHAR(25),
        province VARCHAR(25),
        country VARCHAR(25),
        postal_code CHAR(5),
        fk_id_address_type INT NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY (fk_id_address_type) REFERENCES address_type (id)
);

CREATE TABLE IF NOT EXISTS users(
        id INT AUTO_INCREMENT NOT NULL,
        first_name VARCHAR(35) NOT NULL, 
        last_name VARCHAR(35) NOT NULL, 
        email VARCHAR (40) UNIQUE NOT NULL,
        phone VARCHAR(15),
        birth_date DATE,
        user_password VARCHAR(32),
        isBuyer TINYINT,
        fk_id_address INT,
        PRIMARY KEY(id),
        FOREIGN KEY (fk_id_address) REFERENCES addresses (id)
 );
 
 CREATE TABLE IF NOT EXISTS orders(
        id INT AUTO_INCREMENT NOT NULL,
        order_number CHAR(10) UNIQUE NOT NULL, 
        fk_id_user INT,
        fk_id_address INT,
        PRIMARY KEY(id),
        FOREIGN KEY (fk_id_address) REFERENCES addresses(id),
        FOREIGN KEY (fk_id_user) REFERENCES users(id) ON DELETE SET NULL
 );
 
  CREATE TABLE IF NOT EXISTS instruments(
        id INT AUTO_INCREMENT NOT NULL,
        brand VARCHAR(40) NOT NULL, 
        model VARCHAR(100) NOT NULL,
        price VARCHAR(10) NOT NULL, 
        category VARCHAR(30) NOT NULL, 
        photo_path VARCHAR(512) NOT NULL, 
        PRIMARY KEY(id)
 );
 
 
