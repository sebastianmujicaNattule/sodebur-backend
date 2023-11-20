use lubricantessky;

CREATE TABLE users(
	id bigint PRIMARY KEY auto_increment,
    email varchar(180) not null unique,
    nombre varchar(90) not null,
    apellido varchar(90) not null,
    telefono varchar(90) not null unique,
    image varchar(255),
    password varchar(90) not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null
);

use sodebur;

CREATE TABLE roles (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(90) NOT NULL UNIQUE,
    image VARCHAR(255) NULL,
    route VARCHAR(255) NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    update_at TIMESTAMP(0) NOT NULL
);

INSERT INTO roles(
	name,
    route,
    created_at,
    update_at
)
VALUES(
	'USUARIO',
    '/home/cliente',
    '2023-12-09',
    '2023-12-09'
);
INSERT INTO roles(
	name,
    route,
    created_at,
    update_at
)
VALUES(
	'VENEDEDOR',
    '/home/vendedor',
    '2023-12-09',
    '2023-12-09'
);
INSERT INTO roles(
	name,
    route,
    created_at,
    update_at
)
VALUES(
	'ADMINISTRADOR',
    '/home/administrador',
    '2023-12-09',
    '2023-12-09'
);
CREATE TABLE user_has_roles(
	id_user BIGINT NOT NULL,
    id_rol BIGINT NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    update_at TIMESTAMP(0) NOT NULL,
    FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY(id_user,id_rol)
);
