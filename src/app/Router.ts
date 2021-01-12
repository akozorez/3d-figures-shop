import { MainController, ErrorController, AuthController } from '../controllers';
import { ExpressRouter, SessionRequest, NextFunction, Response } from './interfaces';
import StaticPagesController from '../controllers/StaticPagesController';
import UserController from '../controllers/UserController';
import * as multer from 'multer';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const uploadDest = join(__dirname, '..', 'public', 'uploads');
if (!existsSync(uploadDest)) mkdirSync(uploadDest);

const upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, uploadDest);
        },
        filename: function(req, file, cb) {
            if (file.originalname.endsWith('.gltf')) {
                cb(null, Date.now() + '_' + file.fieldname + '.gltf');
            } else {
                cb(null, file.originalname);
            }
        },
    }),
});
const helpers = {
    isAuth(req: SessionRequest, res: Response,
           next: NextFunction): void {
        if (!req.session.logined) {
            res.redirect('/login');
        } else {
            next();
        }
    },
    notAuth(req: SessionRequest, res: Response,
            next: NextFunction): void {
        if (req.session.logined) {
            res.redirect('/');
        } else {
            next();
        }
    },
    isAdmin(req: SessionRequest, res: Response,
            next: NextFunction): void {

    },
};

export default class Router {

    public static getRouter(): ExpressRouter {
        const router = ExpressRouter();

        router.get('/', MainController.index);

        //Auth
        router.post('/register', helpers.notAuth, AuthController.reg);
        router.post('/login', helpers.notAuth, AuthController.logIn);
        router.get('/logout', helpers.isAuth, AuthController.logOut);
        router.get('/cabinet', helpers.isAuth, AuthController.cabinet);

        //StaticPages
        router.get('/login', helpers.notAuth, StaticPagesController.login);
        router.get('/cart', helpers.isAuth, StaticPagesController.cart);
        router.get('/models', helpers.isAuth, StaticPagesController.models);
        router.get('/model/:name', helpers.isAuth, StaticPagesController.model);
        router.get('/checkout', helpers.isAuth, StaticPagesController.checkout);
        router.get('/register', helpers.notAuth, StaticPagesController.register);
        router.get('/upload', helpers.isAuth, StaticPagesController.upload);
        router.get('/create', helpers.isAuth, StaticPagesController.create);

        //UserController
        router.post('/changeRole/:name', helpers.isAuth, UserController.changeRole);
        router.post('/changeStatus/:trackId', helpers.isAuth, UserController.changeStatus);
        router.post('/cart', helpers.isAuth, UserController.postCart);
        router.post('/upload', helpers.isAuth, upload.single('modelFile'), upload.array(''), UserController.postUpload);
        router.post('/checkout', helpers.isAuth, UserController.postCheckout);

        router.get('*', ErrorController.notFound);
        return router;
    }
}