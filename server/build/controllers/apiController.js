"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
// import * as $ from 'jquery';
// import { request } from 'http';
//declare var $: any;
var colaRecorridos = [];
//const IP: any = 'http://localhost:8080';
var recorridoActual = 0;
var accionActual = 0;
class ApiController {
    getRecorridos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const recorridos = yield database_1.default.query('SELECT * FROM Recorrido');
            res.json(recorridos);
        });
    }
    getAcciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const acciones = yield database_1.default.query('SELECT * FROM Accion');
            res.json(acciones);
        });
    }
    getCola(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(colaRecorridos);
        });
    }
    getLog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const logs = yield database_1.default.query(`SELECT log, date_format(fecha, '%d-%m-%Y %H:%i:%s') as fecha, tiempo, 
        objDerribado, objEvitado, objEncontrado, velocidad, distancia, decision, disparos, recorrido_Recorrido, accion_Accion FROM Log`);
            res.json(logs);
        });
    }
    newRecorrido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.body);
            var d = new Date();
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            var dia = d.getDate();
            var hour = d.getHours();
            var minutes = d.getMinutes();
            var seconds = d.getSeconds();
            var fecha = year + "-" + month + "-" + dia + " " + hour + ":" + minutes + ":" + seconds;
            yield database_1.default.query(`INSERT INTO Recorrido values(0, 0, 0, 0, ?, 0, 0, 0, 0)`, [fecha]);
            let noRecorrido = yield database_1.default.query(`SELECT recorrido from Recorrido ORDER BY recorrido desc LIMIT 1`);
            //let modo = req.body.accion;
            //await pool.query(`INSERT INTO Accion VALUES(0, ?, sysdate())`, [modo]);
            recorridoActual = noRecorrido[0].recorrido;
            //let noAccion = await pool.query(`SELECT accion from Accion ORDER BY accion desc LIMIT 1`);
            //accionActual = noAccion[0].accion;
            colaRecorridos.push({ recorrido: recorridoActual });
            res.json({ estado: true, recorrido: recorridoActual });
        });
    }
    newAccion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            let modo = req.body.accion;
            var d = new Date();
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            var dia = d.getDate();
            var hour = d.getHours();
            var minutes = d.getMinutes();
            var seconds = d.getSeconds();
            var fecha = year + "-" + month + "-" + dia + " " + hour + ":" + minutes + ":" + seconds;
            yield database_1.default.query(`INSERT INTO Accion VALUES(0, ?, ?)`, [modo, fecha]);
            let noRecorrido = yield database_1.default.query(`SELECT recorrido from Recorrido ORDER BY recorrido desc LIMIT 1`);
            recorridoActual = noRecorrido[0].recorrido;
            let noAccion = yield database_1.default.query(`SELECT accion from Accion ORDER BY accion desc LIMIT 1`);
            accionActual = noAccion[0].accion;
            //colaRecorridos.push({ recorrido: recorridoActual, accion: accionActual, modo: modo});
            res.json({ recorrido: recorridoActual, accion: accionActual, modo: modo });
        });
    }
    getRecorrido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(colaRecorridos.shift());
        });
    }
    newLog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
            var d = new Date();
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            var dia = d.getDate();
            var hour = d.getHours();
            var minutes = d.getMinutes();
            var seconds = d.getSeconds();
            var fecha = year + "-" + month + "-" + dia + " " + hour + ":" + minutes + ":" + seconds;
            yield database_1.default.query(`INSERT INTO Log VALUES(0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [fecha, tiempo, objDerribado, objEvitado, objEncontrado, velocidad, distancia, decision, disparos, recorrido, accion]);
            let modo = yield database_1.default.query(`SELECT tipo_Tipo_Accion as modo from Accion where accion = ?`, [accion]);
            console.log(modo);
            if (modo[0].modo == 2 && fin == 1) {
                yield database_1.default.query(`UPDATE Recorrido SET
            velocidad = ?,
            distancia = ?,
            tiempo = ?
            WHERE recorrido = ?`, [velocidad, distancia, tiempo, recorrido]);
            }
            res.json({ estado: true });
        });
    }
    //REPORTES
    dataRecorrido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield database_1.default.query(`SELECT r.recorrido, r.velocidad, r.distancia, r.tiempo, r.objDerribado, r.objEvitado, r.objEncontrado, r.tiempo_decision,
        date_format(r.fecha, '%d-%m-%Y %H:%i:%s') as fecha, date_format(r.fecha, '%d-%m-%Y') as fecha2 from Recorrido r
        order by recorrido desc`);
            res.json(data);
        });
    }
    dataRecorridoOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield database_1.default.query(`SELECT r.recorrido, r.velocidad, r.distancia, r.tiempo, r.objDerribado, r.objEvitado, r.objEncontrado, r.tiempo_decision,
        date_format(r.fecha, '%d-%m-%Y %H:%i:%s') as fecha, date_format(r.fecha, '%d-%m-%Y') as fecha2 from Recorrido r
        WHERE r.recorrido = ?
        order by recorrido desc`, [id]);
            res.json(data);
        });
    }
    dataLog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield database_1.default.query(`SELECT r.recorrido, t.nombre as accion, l.tiempo, l.objDerribado, l.objEvitado, l.objEncontrado, l.velocidad, l.distancia,
        l.decision, l.disparos, date_format(l.fecha, '%d-%m-%Y %H:%i:%s') as fecha, date_format(l.fecha, '%d-%m-%Y') as fecha2 from Log l
       INNER JOIN Recorrido r
       on r.recorrido = l.recorrido_Recorrido
       INNER JOIN Accion a
       on a.accion = l.accion_Accion
       INNER JOIN Tipo_Accion t
       on t.tipo = a.tipo_Tipo_Accion
       ORDER BY fecha desc`);
            res.json(data);
        });
    }
    dataLogOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield database_1.default.query(`SELECT r.recorrido, t.nombre as accion, l.tiempo, l.objDerribado, l.objEvitado, l.objEncontrado, l.velocidad, l.distancia,
        l.decision, l.disparos, date_format(l.fecha, '%d-%m-%Y %H:%i:%s') as fecha, date_format(l.fecha, '%d-%m-%Y') as fecha2 from Log l
       INNER JOIN Recorrido r
       on r.recorrido = l.recorrido_Recorrido
       INNER JOIN Accion a
       on a.accion = l.accion_Accion
       INNER JOIN Tipo_Accion t
       on t.tipo = a.tipo_Tipo_Accion
       WHERE r.recorrido = ?
       ORDER BY fecha desc`, [id]);
            res.json(data);
        });
    }
}
exports.apiController = new ApiController();
