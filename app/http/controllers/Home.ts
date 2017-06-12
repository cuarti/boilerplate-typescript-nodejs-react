
import {Router, Request, Response} from 'express';


export const Home: Router = Router();

Home.get('/', (req: Request, res: Response) => {
    res.render('index');
});
