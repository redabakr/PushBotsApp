import { Router } from 'express';
import * as DeviceController from './controller';

const routes = new Router();

routes.post('/register', DeviceController.registerDevice);
routes.post('/push/:registrationID', DeviceController.pushNotification);

export default routes;