import * as dotenv from 'dotenv';
import { join } from 'path';
// ENVIRONMENT
const env = dotenv.config().parsed;
const {
    MONGO_USER, MONGO_PASSWORD, MONGO_DBNAME, MONGO_ADDRESS,
} = env;
// MONGO
export const MONGO_URI = 'mongodb+srv://' + MONGO_USER + ':' + MONGO_PASSWORD +
    '@' + MONGO_ADDRESS + '/' + MONGO_DBNAME + '?retryWrites=true&w=majority';
export const MONGO_SETTINGS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
// Application
export const TITLE = '3d-figures-shop John Doe';
const BASE_PORT = 8080;
const SERVER_PORT = env.PORT ? parseInt(env.PORT) : BASE_PORT;
const VIEWS_FOLDER = join(__dirname, '..', 'views');
export const PUBLIC_FOLDER = join(__dirname, '..', 'public');
export const PORT = 'port';
export const APP_SETTINGS = [
    { key: PORT, value: SERVER_PORT },
    { key: 'view engine', value: 'ejs' },
    { key: 'views', value: VIEWS_FOLDER },
];
export const LISTEN_FORMATTER = 'Listen on http://localhost:%s';
export const REQUEST_FORMATTER = 'requestMiddleware [%s] on path %s';
export const OPTION_FORMATTER = 'Option %s set as %s';
export const HANDLER_FORMATTER = 'Handler instantiated %s';
export const ERROR_FORMATTER = 'errorMiddleware %s';
// Views
export const SERVER_SIDE_ERROR = 'Error on the server side';
export const NOT_FOUND_ERROR = 'Requested page not found';
export const ERROR_VIEW = 'error';
