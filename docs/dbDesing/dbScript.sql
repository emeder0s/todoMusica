#DROP DATABASE todo_musica;
CREATE DATABASE IF NOT EXISTS todo_musica;

USE todo_musica;

CREATE TABLE IF NOT EXISTS addresses(
        id INT AUTO_INCREMENT NOT NULL,
        way_type VARCHAR(25) NOT NULL, 
        address VARCHAR(100) NOT NULL, 
        a_number INT,
        additional_address VARCHAR (100),
        locality VARCHAR(50),
        province VARCHAR(50),
        country VARCHAR(25),
        postal_code CHAR(5),
        PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS users(
        id INT AUTO_INCREMENT NOT NULL,
        first_name VARCHAR(50) NOT NULL, 
        last_name VARCHAR(50) NOT NULL, 
        dni VARCHAR(15) unique,
        email VARCHAR (40) UNIQUE NOT NULL,
        phone VARCHAR(15),
        birth_date DATE,
        user_password VARCHAR(60),
        isbuyer TINYINT DEFAULT 0,
        fk_id_address INT,
        PRIMARY KEY(id),
        FOREIGN KEY (fk_id_address) REFERENCES addresses(id)
 );
 
 CREATE TABLE IF NOT EXISTS orders(
        id INT AUTO_INCREMENT NOT NULL,
        order_number CHAR(10) UNIQUE NOT NULL, 
        order_date DATE DEFAULT (CURRENT_DATE),
        fk_id_user INT,
        pickup_address VARCHAR(300),
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
        category VARCHAR(100) NOT NULL, 
        photo_path VARCHAR(512) NOT NULL, 
        PRIMARY KEY(id)
 );
   CREATE TABLE IF NOT EXISTS orders_instruments(
        id INT AUTO_INCREMENT NOT NULL,
        qty_instrument int, 
        fk_id_instrument INT NOT NULL,
        fk_id_order INT NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY (fk_id_instrument) REFERENCES instruments(id),
        FOREIGN KEY (fk_id_order) REFERENCES orders(id)
 );

 CREATE TABLE IF NOT EXISTS deleted_users(
        id INT AUTO_INCREMENT NOT NULL,
        old_id INT,
        first_name VARCHAR(50), 
        last_name VARCHAR(50), 
        dni VARCHAR(15),
        email VARCHAR (40),
        phone VARCHAR(15),
        birth_date DATE,
        user_password VARCHAR(60),
        isbuyer TINYINT,
        fk_id_address INT,
        PRIMARY KEY(id),
        FOREIGN KEY (fk_id_address) REFERENCES addresses(id)
 );
 
  DELIMITER //
CREATE TRIGGER copiaSeguridadDelete
BEFORE DELETE ON users
FOR EACH ROW 
BEGIN
	
	INSERT INTO deleted_users VALUES (NULL, OLD.id, OLD.first_name, OLD.last_name, OLD.dni, OLD.email, OLD.phone, OLD.birth_date, OLD.user_password, OLD.isbuyer, OLD.fk_id_address );
    
END //
DELIMITER ;