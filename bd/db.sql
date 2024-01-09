use sodebur;

CREATE TABLE users(
	id bigint PRIMARY KEY auto_increment,
    email varchar(180) not null unique,
    nombre varchar(90) not null,
    apellido varchar(90) not null,
    telefono varchar(90) not null unique,
    image varchar(255),
    password varchar(90) not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null,
    deleted_at timestamp(0) not null,
    created_by bigint not null,
    updated_by bigint not null,
    deleted_by bigint not null,
    row_status bigint not null default 0
);

use sodebur;

CREATE TABLE roles (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(90) NOT NULL UNIQUE,
    image VARCHAR(255) NULL,
    route VARCHAR(255) NOT NULL,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null,
    deleted_at timestamp(0) not null,
    created_by bigint not null,
    updated_by bigint not null,
    deleted_by bigint not null,
    row_status bigint not null default 0
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
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null,
    deleted_at timestamp(0) not null,
    created_by bigint not null,
    updated_by bigint not null,
    deleted_by bigint not null,
    row_status bigint not null default 0,
    FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY(id_user,id_rol)
);

/*  SOD-79   */

DROP TABLE IF EXISTS `authTokens`;
CREATE TABLE `authTokens` (
  `tokenId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `token` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `os` int NOT NULL,
  `expireDate` int NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dateModified` timestamp NOT NULL,
  `dateLogOut` timestamp NOT NULL,
  `nameToken` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`tokenId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `operativeSystems`;
CREATE TABLE `operativeSystems` (
  `idOs` int NOT NULL COMMENT 'Este id es codificado a mano aleatorio y no con auto increment.',
  `name` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`idOs`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `operativeSystems` VALUES (13131829,'Linux'),(13262881,'Windows NT 10.0+'),(17756786,'Mac OS X+'),(21631998,'Windows NT 5.1+'),(27559946,'Windows NT 5.2+'),(29131813,'No identificado'),(44822319,'Windows NT 6.3+'),(51630652,'Macintosh'),(65588027,'Android'),(69650192,'Windows NT 6.2+'),(73945955,'Windows otros'),(96519663,'Windows NT 6.1+'),(99386745,'Thunder Client (https://www.thunderclient.com)'),(99677717,'iPhone'),(99764755,'Windows NT 6.0+');

/* SOD-21 */
ALTER TABLE `users` 
	CHANGE `id` `userId` bigint NOT NULL AUTO_INCREMENT ;