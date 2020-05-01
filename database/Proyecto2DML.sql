INSERT INTO Recorrido values(0, 0, 0);
SELECT * FROM Recorrido;

INSERT INTO Tipo_Accion VALUES(0, 'Derribar');
INSERT INTO Tipo_Accion VALUES(0, 'Detener');
INSERT INTO Tipo_Accion VALUES(0, 'Evitar');
INSERT INTO Tipo_Accion VALUES(0, 'Atacar');

SELECT * FROM Tipo_Accion;

INSERT INTO Accion VALUES(0, 1);

SELECT * FROM Accion;

INSERT INTO Log VALUES(0, sysdate(), tiempo, objetos, velocidad, distancia, decision, disparos, recorrido, accion);

SELECT recorrido from Recorrido ORDER BY recorrido desc LIMIT 1;
SELECT accion from Accion ORDER BY accion desc LIMIT 1;

SELECT log, date_format(fecha, '%d-%m-%Y %H:%i:%s') as fecha, tiempo, 
        objetos, velocidad, distancia, decision, disparos, recorrido_Recorrido, accion_Accion FROM Log;
        
        
SELECT r.recorrido, r.velocidad, r.distancia, r.tiempo,
 date_format(r.fecha, '%d-%m-%Y %H:%i:%s') as fecha, date_format(r.fecha, '%d-%m-%Y') as fecha2 from Recorrido r;




SELECT r.recorrido, t.nombre as accion, l.tiempo, l.objetos, l.velocidad, l.distancia,
 l.decision, l.disparos, date_format(l.fecha, '%d-%m-%Y %H:%i:%s') as fecha, date_format(l.fecha, '%d-%m-%Y') as fecha2 from Log l
INNER JOIN Recorrido r
on r.recorrido = l.recorrido_Recorrido
INNER JOIN Accion a
on a.accion = l.accion_Accion
INNER JOIN Tipo_Accion t
on t.tipo = a.tipo_Tipo_Accion;


SELECT * FROM Log;
SELECT * FROM Accion;
        
        
        
        
        
        