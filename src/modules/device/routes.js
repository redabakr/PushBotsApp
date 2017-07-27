import { Router } from 'express';
import * as DeviceController from './controller';

const routes = new Router();

routes.post('/register', DeviceController.registerDevice);
routes.post('/push/:token', DeviceController.pushNotification);

export default routes;