import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import PatientController from './app/controllers/PatientController';
import AppointmentController from './app/controllers/AppointmentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/patients/:id', PatientController.index);
routes.post('/patients', PatientController.store);
routes.put('/patients', PatientController.update);
routes.post('/appointments', AppointmentController.store);
routes.get('/appointments/:patient_id', AppointmentController.index);

export default routes;
