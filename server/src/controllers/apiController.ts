import { Request, Response } from 'express';
import pool from '../database';
// import * as $ from 'jquery';
// import { request } from 'http';

//declare var $: any;

var colaRecorridos: any[] = [];
//const IP: any = 'http://localhost:8080';
var recorridoActual = 0;
var accionActual = 0;

class ApiController {

    public async getRecorridos(req: Request, res: Response) {
        const recorridos = await pool.query('SELECT * FROM Recorrido');
        res.json(recorridos);
    }

    public async getAcciones(req: Request, res: Response) {
        const acciones = await pool.query('SELECT * FROM Accion');
        res.json(acciones);
    }

    public async getCola(req: Request, res: Response) {
        res.json(colaRecorridos);
    }

    public async getLog(req: Request, res: Response) {
        const logs = await pool.query(`SELECT log, date_format(fecha, '%d-%m-%Y %H:%i:%s') as fecha, tiempo, 
        objDerribado, objEvitado, objEncontrado, velocidad, distancia, decision, disparos, recorrido_Recorrido, accion_Accion FROM Log`);
        res.json(logs);
    }

    public async newRecorrido(req: Request, res: Response) {
        //console.log(req.body);
        await pool.query(`INSERT INTO Recorrido values(0, 0, 0, 0, sysdate())`);
        let noRecorrido = await pool.query(`SELECT recorrido from Recorrido ORDER BY recorrido desc LIMIT 1`);
        //let modo = req.body.accion;
        //await pool.query(`INSERT INTO Accion VALUES(0, ?, sysdate())`, [modo]);
        recorridoActual = noRecorrido[0].recorrido;
        //let noAccion = await pool.query(`SELECT accion from Accion ORDER BY accion desc LIMIT 1`);
        //accionActual = noAccion[0].accion;
        colaRecorridos.push({ recorrido: recorridoActual});
        res.json({ estado: true, recorrido: recorridoActual});
    }

    public async newAccion(req: Request, res: Response) {
        console.log(req.body);
        let modo = req.body.accion;
        await pool.query(`INSERT INTO Accion VALUES(0, ?, sysdate())`, [modo]);
        let noRecorrido = await pool.query(`SELECT recorrido from Recorrido ORDER BY recorrido desc LIMIT 1`);
        recorridoActual = noRecorrido[0].recorrido;
        let noAccion = await pool.query(`SELECT accion from Accion ORDER BY accion desc LIMIT 1`);
        accionActual = noAccion[0].accion;
        //colaRecorridos.push({ recorrido: recorridoActual, accion: accionActual, modo: modo});
        res.json({ recorrido: recorridoActual, accion: accionActual, modo: modo});
    }

    public async getRecorrido(req: Request, res: Response) {
        res.json(colaRecorridos.shift());
    }

    public async newLog(req: Request, res: Response) {
        console.log(req.body);
        let tiempo = req.body.tiempo;
        let accion = req.body.accion;
        let distancia = req.body.distancia;
        let velocidad = req.body.velocidad;
        let decision = req.body.decision;
        let recorrido = req.body.recorrido;
        let objDerribado = req.body.objDerribado;
        let objEvitado = req.body.objEvitado;
        let objEncontrado = req.body.objEncontrado;
        let disparos = req.body.disparos;
        let fin = req.body.fin;
        await pool.query(`INSERT INTO Log VALUES(0, sysdate(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [tiempo, objDerribado, objEvitado, objEncontrado, velocidad, distancia, decision, disparos, recorrido, accion]);
        let modo = await pool.query(`SELECT tipo_Tipo_Accion as modo from Accion where accion = ?`, [accion]);
        console.log(modo);
        if(modo[0].modo == 2 && fin == 1){
            await pool.query(`UPDATE Recorrido SET
            velocidad = ?,
            distancia = ?,
            tiempo = ?
            WHERE recorrido = ?`, [velocidad, distancia, tiempo, recorrido]);
        }
        res.json({estado: true});
    }

    //REPORTES

    public async dataRecorrido(req: Request, res: Response) {
        const data = await pool.query(`SELECT r.recorrido, r.velocidad, r.distancia, r.tiempo,
        date_format(r.fecha, '%d-%m-%Y %H:%i:%s') as fecha, date_format(r.fecha, '%d-%m-%Y') as fecha2 from Recorrido r
        order by recorrido asc`);
        res.json(data);
    }

    public async dataLog(req: Request, res: Response) {
        const data = await pool.query(`SELECT r.recorrido, t.nombre as accion, l.tiempo, l.objDerribado, l.objEvitado, l.objEncontrado, l.velocidad, l.distancia,
        l.decision, l.disparos, date_format(l.fecha, '%d-%m-%Y %H:%i:%s') as fecha, date_format(l.fecha, '%d-%m-%Y') as fecha2 from Log l
       INNER JOIN Recorrido r
       on r.recorrido = l.recorrido_Recorrido
       INNER JOIN Accion a
       on a.accion = l.accion_Accion
       INNER JOIN Tipo_Accion t
       on t.tipo = a.tipo_Tipo_Accion
       ORDER BY fecha asc`);
        res.json(data);
    }
}

export const apiController = new ApiController();