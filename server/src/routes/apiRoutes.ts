import { Router } from 'express';
import { apiController } from '../controllers/apiController';
import pool from '../database';

class ApiRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void {
        this.router.get('/getRepeticiones', apiController.getRepeticiones);
        this.router.post('/newRepeticion', apiController.newRepeticion);
        this.router.post('/newRutina', apiController.newRutina);
        this.router.post('/newPausa', apiController.newPausa);
        this.router.get('/getAccion', apiController.getAccion);
        this.router.get('/getCorrectas', apiController.getCorrectas);
        this.router.get('/getIncorrectas', apiController.getIncorrectas);
        this.router.get('/getEficienciaEjercicio', apiController.getEficienciaEjercicio);
        this.router.get('/getEficienciaRutina', apiController.getEficienciaRutina);
        this.router.get('/getRelacionRep', apiController.getRelacionRep);
        this.router.get('/getPausa', apiController.getPausa);
        this.router.get('/getRepeticionesTipo', apiController.getRepeticionesTipo);
    }

}

const apiRoutes = new ApiRoutes();
export default apiRoutes.router;