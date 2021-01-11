import { it } from 'mocha';
import * as mongoose from "mongoose";
import { MONGO_SETTINGS, MONGO_URI } from '../src/app/Const';
import { UserModelTest } from '../src/models/UserModel';
import { FigureModelTest } from '../src/models/FigureModel';
import { TrackModelTest } from '../src/models/TrackModel';
import UserService from '../src/services/UserService';

function importTest(name: string, path: string) {
    describe(name, () => {
        require(path);
    })
}

describe('all tests', () => {
    before(async function() {
        await mongoose.connect(MONGO_URI, MONGO_SETTINGS);
    });

    importTest('UserServiceTest', './UsersServiceTest');

    importTest('FigureServiceTest', './FigureServiceTest');

    importTest('TrackServiceTest', './TrackServiceTest');

    after(async function() {
        await UserModelTest.collection.drop();
        await FigureModelTest.collection.drop();
        await TrackModelTest.collection.drop();
        await mongoose.disconnect();
    });
})