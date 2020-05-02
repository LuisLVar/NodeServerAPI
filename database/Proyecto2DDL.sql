CREATE DATABASE TANQUE;
USE TANQUE;

-- DROP TABLE IF EXISTS Recorrido CASCADE;
CREATE TABLE Recorrido(
	recorrido INTEGER AUTO_INCREMENT NOT NULL,
	velocidad float,
	distancia float,
    tiempo float,
    fecha timestamp,
	CONSTRAINT Recorrido_pk PRIMARY KEY (recorrido)
);

-- ALTER TABLE Recorrido add column fecha timestamp;
-- ALTER TABLE Recorrido add column tiempo float;

-- DROP TABLE IF EXISTS Accion CASCADE;
CREATE TABLE Accion(
	accion INTEGER AUTO_INCREMENT NOT NULL,
	tipo_Tipo_Accion integer,
    fecha timestamp,
	CONSTRAINT Accion_pk PRIMARY KEY (accion)
);

-- ALTER TABLE Accion add column fecha timestamp;

-- DROP TABLE IF EXISTS Tipo_Accion CASCADE;
CREATE TABLE Tipo_Accion(
	tipo INTEGER AUTO_INCREMENT NOT NULL,
	nombre varchar(30) NOT NULL,
	CONSTRAINT Tipo_Accion_pk PRIMARY KEY (tipo)

);

-- DROP TABLE IF EXISTS Log CASCADE;-- 
CREATE TABLE Log(
	log INTEGER AUTO_INCREMENT NOT NULL,
	fecha timestamp NOT NULL,
	tiempo float NOT NULL,
	objetos integer,
	velocidad float NOT NULL,
    distancia float,
	decision float,
	disparos integer,
	recorrido_Recorrido integer,
	accion_Accion integer,
	CONSTRAINT Log_pk PRIMARY KEY (log)
);


-- ALTER TABLE Log DROP CONSTRAINT IF EXISTS Recorrido_fk CASCADE;
ALTER TABLE Log ADD CONSTRAINT Recorrido_fk FOREIGN KEY (recorrido_Recorrido)
REFERENCES Recorrido (recorrido) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- ALTER TABLE Accion DROP CONSTRAINT IF EXISTS Tipo_Accion_fk CASCADE;
ALTER TABLE Accion ADD CONSTRAINT Tipo_Accion_fk FOREIGN KEY (tipo_Tipo_Accion)
REFERENCES Tipo_Accion (tipo) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --


-- ALTER TABLE Log DROP CONSTRAINT IF EXISTS Accion_fk CASCADE;
ALTER TABLE Log ADD CONSTRAINT Accion_fk FOREIGN KEY (accion_Accion)
REFERENCES Accion (accion) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;

-- DROP ALL
-- DROP TABLE IF EXISTS Log CASCADE;
-- DROP TABLE IF EXISTS Accion CASCADE;
-- DROP TABLE IF EXISTS Recorrido CASCADE;
-- DROP TABLE IF EXISTS Tipo_Accion CASCADE;
-- 


