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
        this.router.get('/getAccion', apiController.getAccion);
        this.router.post('/newLog', apiController.newLog);
        this.router.get('/getCola', apiController.getCola);
        this.router.get('/getLog', apiController.getLog);
    }

}

const apiRoutes = new ApiRoutes();
export default apiRoutes.router;