"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiController_1 = require("../controllers/apiController");
class ApiRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/newRecorrido', apiController_1.apiController.newRecorrido);
        this.router.get('/getRecorridos', apiController_1.apiController.getRecorridos);
        this.router.post('/newAccion', apiController_1.apiController.newAccion);
        this.router.get('/getAccion', apiController_1.apiController.getAccion);
        this.router.post('/newLog', apiController_1.apiController.newLog);
        this.router.get('/getCola', apiController_1.apiController.getCola);
        this.router.get('/getLog', apiController_1.apiController.getLog);
    }
}
const apiRoutes = new ApiRoutes();
exports.default = apiRoutes.router;
