import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import AvailableController from './app/controllers/AvailableController';
import ProviderController from './app/controllers/ProviderController';
import Appointments from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';

import auth from './app/middlewares/auth';
import isProvider from './app/middlewares/isProvider';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(auth);

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/appointments', Appointments.index);
routes.post('/appointments', Appointments.store);
routes.delete('/appointments/:id', Appointments.delete);

routes.get('/schedule', isProvider, ScheduleController.index);

routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

routes.get('/notifications', isProvider, NotificationController.index);
routes.put('/notifications/:id', isProvider, NotificationController.update);

export default routes;
