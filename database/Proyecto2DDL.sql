CREATE DATABASE TANQUE;
USE TANQUE;

-- DROP TABLE IF EXISTS Recorrido CASCADE;
CREATE TABLE Recorrido(
	recorrido INTEGER AUTO_INCREMENT NOT NULL,
	velocidad float,
	distancia float,
    tiempo float,
    fecha timestamp,
    objDerribado integer,
    objEvitado integer,
    objEncontrado integer,
    tiempo_decision float,
	CONSTRAINT Recorrido_pk PRIMARY KEY (recorrido)
);

SELECT * FROM Recorrido;

SELECT * FROM Recorrido;

UPDATE Recorrido SET objDerribado = 0, objEvitado = 0, objEncontrado = 0, tiempo_decision = 0
WHERE recorrido != 0;

ALTER TABLE Recorrido DROP COLUMN objetos;
ALTER TABLE Recorrido ADD COLUMN objEncontrado INTEGER after fecha;
ALTER TABLE Recorrido ADD COLUMN objEvitado INTEGER after fecha;
ALTER TABLE Recorrido ADD COLUMN objDerribado INTEGER after fecha;
ALTER TABLE Recorrido ADD COLUMN tiempo_decision INTEGER after objEncontrado;
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
    objDerribado integer,
    objEvitado integer,
    objEncontrado integer,
	velocidad float NOT NULL,
    distancia float,
	decision float,
	disparos integer,
	recorrido_Recorrido integer,
	accion_Accion integer,
	CONSTRAINT Log_pk PRIMARY KEY (log)
);

UPDATE Log SET objDerribado = 0, objEvitado = 0, objEncontrado = 0
WHERE log != 0;

ALTER TABLE Log DROP COLUMN objetos;

ALTER TABLE Log ADD COLUMN objEncontrado INTEGER after tiempo;
ALTER TABLE Log ADD COLUMN objEvitado INTEGER after tiempo;
ALTER TABLE Log ADD COLUMN objDerribado INTEGER after tiempo;

SELECT * FROM Log;

SELECT log, date_format(fecha, '%d-%m-%Y %H:%i:%s') as fecha, tiempo, 
        objDerribado, objEvitado, objEncontrado, velocidad, distancia, decision, disparos, recorrido_Recorrido, accion_Accion FROM Log;
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

SELECT r.recorrido, t.nombre as accion, l.tiempo, l.objDerribado, l.objEvitado, l.objEncontrado, l.velocidad, l.distancia,
        l.decision, l.disparos, date_format(l.fecha, '%d-%m-%Y %H:%i:%s') as fecha, date_format(l.fecha, '%d-%m-%Y') as fecha2 from Log l
       INNER JOIN Recorrido r
       on r.recorrido = l.recorrido_Recorrido
       INNER JOIN Accion a
       on a.accion = l.accion_Accion
       INNER JOIN Tipo_Accion t
       on t.tipo = a.tipo_Tipo_Accion
       WHERE r.recorrido = 13
       ORDER BY fecha desc;

UPDATE Log SET fecha = '2020-05-08 00:00:00' WHERE log != 0;
UPDATE Recorrido SET fecha = '2020-05-08 00:00:00' WHERE recorrido != 0;
