import { Request, Response } from 'express';
import pool from '../database';
// import * as $ from 'jquery';
// import { request } from 'http';

//declare var $: any;

var colaSeries: any[] = [];
var pausaGeneral: any = 0; // terminar o pausar desde frontend; 0 = nada; 1 = pausa ; 2 = termina.
const IP: any = 'http://localhost:8080';
var serieActual = 0;

class ApiController {

    public async getRepeticiones(req: Request, res: Response) {
        const pesos = await pool.query('SELECT * FROM repeticion');
        res.json(pesos);
    }

    public async newRepeticion(req: Request, res: Response) {
        await pool.query(`INSERT INTO repeticion VALUES(0, ?, ?, ?, sysdate(), ?)`, [req.body.estado, req.body.peso, req.body.ritmo, req.body.serie]);
        let estado = false;
        serieActual = req.body.serie;
        //Pausa
        if (req.body.estado == '1') {
            estado = true
        }

        let pause = pausaGeneral;
        if (pause == 1 || pause == 2) {
            pausaGeneral = 0;
        }

        let pausa2 = req.body.pausa;
        console.log("Pausa: " + pausa2);
        if (pausa2 == '1') {
            console.log('Entro en pausa de arduino');
            //let nserie = colaSeries[0].serie;
            //this.newPausaArduino(3, nserie);
            await pool.query(`INSERT INTO pausa VALUES(0, 3, sysdate(), ?)`, [serieActual]);  //Pausa Forzada desde Arduino   
            pausaGeneral = 1;
        }

        //POST PARA ACTUALIZAR SOCKET.
        const axios = require('axios')
        axios.post(IP + "/actualizar", {
            peso: req.body.peso,
            r: req.body.ritmo,
            s: 0,
            tr: req.body.repeticiones,
            ts: pausaGeneral,
            buenas: req.body.correctas,
            malas: req.body.incorrectas,
            e: req.body.tipo
        })
            .then((resp: any) => {
                console.log(`statusCode: ${res.statusCode}`)
                //console.log(resp)
            })
            .catch((error: any) => {
                console.error(error)
            })

        if (pausa2 == '1') {
            pausaGeneral = 0;
        }

        // RESPUESTA DEL REQUEST.
        res.json({ estado: estado, pausa: pause });

    }

    public async newRutina(req: Request, res: Response) {

        let rutina = req.body;

        // INSERTO RUTINA.
        await pool.query(`INSERT INTO rutina VALUES(0, 'P', sysdate())`);
        let nrutina = await pool.query(`SELECT rutina from rutina ORDER BY rutina desc LIMIT 1`);

        // PARA CADA UNO DE LOS EJERCICIOS.
        for (let ejercicio of rutina.rutina) {

            //EJERCICIO
            await pool.query(`INSERT INTO ejercicio VALUES(0, ?, ?)`, [nrutina[0].rutina, ejercicio.tipo]);
            let nejercicio = await pool.query(`SELECT ejercicio from ejercicio ORDER BY ejercicio desc LIMIT 1`);

            for (let i = 0; i < ejercicio.sets; i++) {
                // SERIES
                await pool.query(`INSERT INTO serie VALUES(0, 'P', ?, 0, 0, ?)`, [ejercicio.reps, nejercicio[0].ejercicio]);
                let nserie = await pool.query(`SELECT serie from serie ORDER BY serie desc LIMIT 1`);
                colaSeries.push({ rutina: nrutina[0].rutina, serie: nserie[0].serie, repeticiones: ejercicio.reps, tipo: ejercicio.tipo });
            }
        }
        res.json(colaSeries);
    }

    public async getAccion(req: Request, res: Response) {
        res.json(colaSeries.shift());
    }
}

export const apiController = new ApiController();