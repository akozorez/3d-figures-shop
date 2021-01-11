import { MainController, ErrorController, AuthController } from '../controllers';
import { ExpressRouter } from './interfaces';
import StaticPagesController from '../controllers/StaticPagesController';
import UserController from '../controllers/UserController';

export default class Router {
    public static getRouter(): ExpressRouter {
        const router = ExpressRouter();

        router.get('/', MainController.index);
        router.get('/test', MainController.test);

        router.get('*', ErrorController.notFound);

        //Auth
        router.post('/reg', AuthController.reg);
        router.post('/login', AuthController.logIn);
        router.get('/logout', AuthController.logOut);
        router.get('/cabinet', AuthController.cabinet);

        //StaticPages
        router.get('/login', StaticPagesController.login);
        router.get('/cart', StaticPagesController.cart);
        router.get('/models', StaticPagesController.models);
        router.get('/register', StaticPagesController.register);
        router.get('/upload', StaticPagesController.upload);
        router.get('/create', StaticPagesController.create)

        //UserController
        router.post('/changeRole/:name', UserController.changeRole);
        router.post('/changeStatus/:trackId', UserController.changeStatus);
        router.post('/cart', UserController.postCart);
        return router;
    }
}