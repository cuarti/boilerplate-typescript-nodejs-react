
import {Router} from 'express';
import {Home} from './controllers/Home';


export const Routes: Router = Router();

Routes.use('/*', Home);
