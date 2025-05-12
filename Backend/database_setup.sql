-- Script de configuración de base de datos para el sistema de gestión de usuarios
-- Creación de tablas y datos iniciales

-- Eliminar tablas si existen para evitar conflictos
DROP TABLE IF EXISTS contact_info_tb;
DROP TABLE IF EXISTS user_document_tb;
DROP TABLE IF EXISTS app_user_tb;
DROP TABLE IF EXISTS type_document_tb;
DROP TABLE IF EXISTS country_tb;

-- Tabla de países
CREATE TABLE country_tb (
  id INT AUTO_INCREMENT PRIMARY KEY,
  country_name VARCHAR(50) NOT NULL,
  country_code VARCHAR(5)
);

-- Tabla de tipos de documentos
CREATE TABLE type_document_tb (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name_type_document VARCHAR(50) NOT NULL
);

-- Tabla de usuarios
CREATE TABLE app_user_tb (
  id INT AUTO_INCREMENT PRIMARY KEY,
  last_name VARCHAR(20) NOT NULL,
  name VARCHAR(20) NOT NULL,
  is_militar BOOLEAN NOT NULL DEFAULT FALSE,
  time_create DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  is_temporal BOOLEAN NOT NULL DEFAULT FALSE,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  email_verified BOOLEAN NOT NULL DEFAULT FALSE,
  verification_token VARCHAR(255)
);

-- Tabla de documentos de usuario
CREATE TABLE user_document_tb (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  document VARCHAR(20) NOT NULL,
  type_document_id INT NOT NULL,
  place_expedition VARCHAR(60),
  date_expedition DATETIME,
  FOREIGN KEY (user_id) REFERENCES app_user_tb(id) ON DELETE CASCADE,
  FOREIGN KEY (type_document_id) REFERENCES type_document_tb(id)
);

-- Tabla de información de contacto
CREATE TABLE contact_info_tb (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  address VARCHAR(60),
  country_id INT NOT NULL,
  city VARCHAR(50),
  phone VARCHAR(20),
  cel_phone VARCHAR(20),
  emergency_name VARCHAR(100),
  emergency_phone VARCHAR(20),
  FOREIGN KEY (user_id) REFERENCES app_user_tb(id) ON DELETE CASCADE,
  FOREIGN KEY (country_id) REFERENCES country_tb(id)
);

-- Inserción de datos iniciales para países
INSERT INTO country_tb (country_name, country_code) VALUES
('Colombia', 'CO'),
('Estados Unidos', 'US'),
('España', 'ES'),
('México', 'MX'),
('Argentina', 'AR'),
('Chile', 'CL'),
('Perú', 'PE'),
('Brasil', 'BR'),
('Ecuador', 'EC'),
('Venezuela', 'VE');

-- Inserción de datos iniciales para tipos de documentos
INSERT INTO type_document_tb (name_type_document) VALUES
('Cédula de Ciudadanía'),
('Tarjeta de Identidad'),
('Pasaporte'),
('Cédula de Extranjería'),
('Registro Civil'),
('Carné Diplomático'),
('Documento Nacional de Identidad'),
('Número de Identificación Tributaria');

-- Índices para mejorar el rendimiento
CREATE INDEX idx_userdocument_userid ON user_document_tb(user_id);
CREATE INDEX idx_userdocument_typedocumentid ON user_document_tb(type_document_id);
CREATE INDEX idx_contactinfo_userid ON contact_info_tb(user_id);
CREATE INDEX idx_contactinfo_countryid ON contact_info_tb(country_id);

-- Nota: Las contraseñas de los usuarios se encriptarán mediante bcrypt en la aplicación
-- antes de ser almacenadas en la base de datos.