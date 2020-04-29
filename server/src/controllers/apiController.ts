import { Request, Response } from 'express';
import pool from '../database';
// import * as $ from 'jquery';
// import { request } from 'http';

//declare var $: any;

var colaAcciones: any[] = [];
//const IP: any = 'http://localhost:8080';
var recorridoActual = 0;
var accionActual = 0;

class ApiController {

    public async getRecorridos(req: Request, res: Response) {
        const recorridos = await pool.query('SELECT * FROM Recorrido');
        res.json(recorridos);
    }

    public async getCola(req: Request, res: Response) {
        res.json(colaAcciones);
    }

    public async getLog(req: Request, res: Response) {
        const logs = await pool.query(`SELECT log, date_format(fecha, '%d-%m-%Y %H:%i:%s') as fecha, tiempo, 
        objetos, velocidad, distancia, decision, disparos, recorrido_Recorrido, accion_Accion FROM Log`);
        res.json(logs);
    }

    public async newRecorrido(req: Request, res: Response) {
        await pool.query(`INSERT INTO Recorrido values(0, 0, 0)`);
        let noRecorrido = await pool.query(`SELECT recorrido from Recorrido ORDER BY recorrido desc LIMIT 1`);
        let modo = req.body.accion;
        await pool.query(`INSERT INTO Accion VALUES(0, ?)`, [modo]);
        recorridoActual = noRecorrido[0].recorrido;
        let noAccion = await pool.query(`SELECT accion from Accion ORDER BY accion desc LIMIT 1`);
        accionActual = noAccion[0].accion;
        colaAcciones.push({ recorrido: recorridoActual, accion: accionActual, modo: modo});
        res.json({ estado: true, recorrido: recorridoActual, modo: modo });
    }

    public async newAccion(req: Request, res: Response) {
        let modo = req.body.accion;
        await pool.query(`INSERT INTO Accion VALUES(0, ?)`, [modo]);
        let noRecorrido = await pool.query(`SELECT recorrido from Recorrido ORDER BY recorrido desc LIMIT 1`);
        recorridoActual = noRecorrido[0].recorrido;
        let noAccion = await pool.query(`SELECT accion from Accion ORDER BY accion desc LIMIT 1`);
        accionActual = noAccion[0].accion;
        colaAcciones.push({ recorrido: recorridoActual, accion: accionActual, modo: modo});
        res.json(colaAcciones);
    }

    public async getAccion(req: Request, res: Response) {
        res.json(colaAcciones.shift());
    }

    public async newLog(req: Request, res: Response) {
        let tiempo = req.body.tiempo;
        let accion = req.body.accion;
        let distancia = req.body.distancia;
        let velocidad = req.body.velocidad;
        let decision = req.body.decision;
        let recorrido = req.body.recorrido;
        let objetos = req.body.objetos;
        let disparos = req.body.disparos;
        await pool.query(`INSERT INTO Log VALUES(0, sysdate(), ?, ?, ?, ?, ?, ?, ?, ?)`, [tiempo, objetos, velocidad, distancia, decision, disparos, recorrido, accion]);
        res.json({estado: true});
    }
}

export const apiController = new ApiController();