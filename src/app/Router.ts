import { MainController, ErrorController, AuthController } from '../controllers';
import { ExpressRouter } from './interfaces';

export default class Router {
    public static getRouter(): ExpressRouter {
        const router = ExpressRouter();
        router.get('/', MainController.index);
        router.get('/test', MainController.test);

        router.get('*', ErrorController.notFound);

        router.post('/reg', AuthController.reg);
        router.post('/login', AuthController.logIn);
        return router;
    }
}