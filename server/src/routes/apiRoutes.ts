import { Router } from 'express';
import { apiController } from '../controllers/apiController';
import pool from '../database';

class ApiRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void {
        this.router.post('/newRecorrido', apiController.newRecorrido);
        this.router.get('/getRecorridos', apiController.getRecorridos);
        this.router.post('/newAccion', apiController.newAccion);
        this.router.get('/getRecorrido', apiController.getRecorrido);
        this.router.post('/newLog', apiController.newLog);
        this.router.get('/getCola', apiController.getCola);
        this.router.get('/getLog', apiController.getLog);
        this.router.get('/getAcciones', apiController.getAcciones);
        // Reportes
        this.router.get('/dataRecorrido', apiController.dataRecorrido);
        this.router.get('/dataLog', apiController.dataLog);
    }

}

const apiRoutes = new ApiRoutes();
export default apiRoutes.router;