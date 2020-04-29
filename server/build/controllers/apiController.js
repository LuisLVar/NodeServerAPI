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
var colaAcciones = [];
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
    getCola(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(colaAcciones);
        });
    }
    getLog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const logs = yield database_1.default.query(`SELECT log, date_format(fecha, '%d-%m-%Y %H:%i:%s') as fecha, tiempo, 
        objetos, velocidad, distancia, decision, disparos, recorrido_Recorrido, accion_Accion FROM Log`);
            res.json(logs);
        });
    }
    newRecorrido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`INSERT INTO Recorrido values(0, 0, 0)`);
            let noRecorrido = yield database_1.default.query(`SELECT recorrido from Recorrido ORDER BY recorrido desc LIMIT 1`);
            let modo = req.body.accion;
            yield database_1.default.query(`INSERT INTO Accion VALUES(0, ?)`, [modo]);
            recorridoActual = noRecorrido[0].recorrido;
            let noAccion = yield database_1.default.query(`SELECT accion from Accion ORDER BY accion desc LIMIT 1`);
            accionActual = noAccion[0].accion;
            colaAcciones.push({ recorrido: recorridoActual, accion: accionActual, modo: modo });
            res.json({ estado: true, recorrido: recorridoActual, modo: modo });
        });
    }
    newAccion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let modo = req.body.accion;
            yield database_1.default.query(`INSERT INTO Accion VALUES(0, ?)`, [modo]);
            let noRecorrido = yield database_1.default.query(`SELECT recorrido from Recorrido ORDER BY recorrido desc LIMIT 1`);
            recorridoActual = noRecorrido[0].recorrido;
            let noAccion = yield database_1.default.query(`SELECT accion from Accion ORDER BY accion desc LIMIT 1`);
            accionActual = noAccion[0].accion;
            colaAcciones.push({ recorrido: recorridoActual, accion: accionActual, modo: modo });
            res.json(colaAcciones);
        });
    }
    getAccion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(colaAcciones.shift());
        });
    }
    newLog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let tiempo = req.body.tiempo;
            let accion = req.body.accion;
            let distancia = req.body.distancia;
            let velocidad = req.body.velocidad;
            let decision = req.body.decision;
            let recorrido = req.body.recorrido;
            let objetos = req.body.objetos;
            let disparos = req.body.disparos;
            yield database_1.default.query(`INSERT INTO Log VALUES(0, sysdate(), ?, ?, ?, ?, ?, ?, ?, ?)`, [tiempo, objetos, velocidad, distancia, decision, disparos, recorrido, accion]);
            res.json({ estado: true });
        });
    }
}
exports.apiController = new ApiController();
