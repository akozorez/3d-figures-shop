import { Router as ExpressRouter } from 'express';
import { MainController } from '../controllers';

export default class Router {
    private static _web: ExpressRouter;

    public static get(): ExpressRouter {
        if (Router._web) {
            return Router._web;
        } else {
            const router = ExpressRouter();

            router.get('/', MainController.index);


            return Router._web = router;
        }
    }
}