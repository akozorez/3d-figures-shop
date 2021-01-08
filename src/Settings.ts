import * as dotenv from 'dotenv';

const { MONGO_USER, MONGO_PASSWORD, MONGO_DBNAME, MONGO_ADDRESS } = dotenv.config().parsed;

export const MONGO_CONNECTION_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

export const MONGO_URI = 'mongodb+srv://' + MONGO_USER + ':' + MONGO_PASSWORD +
    '@' + MONGO_ADDRESS + '/' + MONGO_DBNAME + '?retryWrites=true&w=majority';
