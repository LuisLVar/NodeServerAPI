CREATE DATABASE TANQUE;
USE TANQUE;

CREATE TABLE "Recorrido"(
	recorrido serial NOT NULL,
	velocidad float,
	distancia float,
	CONSTRAINT "Recorrido_pk" PRIMARY KEY (recorrido)

);

-- DROP TABLE IF EXISTS "Accion" CASCADE;
CREATE TABLE "Accion"(
	accion serial NOT NULL,
	"tipo_Tipo_Accion" integer,
	CONSTRAINT "Accion_pk" PRIMARY KEY (accion)

);

-- DROP TABLE IF EXISTS "Tipo_Accion" CASCADE;
CREATE TABLE "Tipo_Accion"(
	tipo serial NOT NULL,
	nombre varchar(30) NOT NULL,
	CONSTRAINT "Tipo_Accion_pk" PRIMARY KEY (tipo)

);

-- DROP TABLE IF EXISTS "Log" CASCADE;
CREATE TABLE "Log"(
	log serial NOT NULL,
	fecha timestamp NOT NULL,
	tiempo float NOT NULL,
	objetos integer,
	velocidad float NOT NULL,
	decision float,
	disparos integer,
	"recorrido_Recorrido" integer,
	"accion_Accion" integer,
	CONSTRAINT "Log_pk" PRIMARY KEY (log)

);

-- ALTER TABLE "Log" DROP CONSTRAINT IF EXISTS "Recorrido_fk" CASCADE;
ALTER TABLE "Log" ADD CONSTRAINT "Recorrido_fk" FOREIGN KEY ("recorrido_Recorrido")
REFERENCES "Recorrido" (recorrido) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- ALTER TABLE "Accion" DROP CONSTRAINT IF EXISTS "Tipo_Accion_fk" CASCADE;
ALTER TABLE "Accion" ADD CONSTRAINT "Tipo_Accion_fk" FOREIGN KEY ("tipo_Tipo_Accion")
REFERENCES "Tipo_Accion" (tipo) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --


-- ALTER TABLE "Log" DROP CONSTRAINT IF EXISTS "Accion_fk" CASCADE;
ALTER TABLE "Log" ADD CONSTRAINT "Accion_fk" FOREIGN KEY ("accion_Accion")
REFERENCES "Accion" (accion) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;



