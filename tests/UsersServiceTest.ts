import { it } from 'mocha';
import { assert } from 'chai';
import * as mongoose from 'mongoose';
import UserService from '../src/services/UserService';
import { MONGO_SETTINGS, MONGO_URI } from '../src/app/Const';
import { IUserModel, UserTestModel } from '../src/models/UserModel';
import { IServiceResult } from '../src/services/interfaces';

describe('User service tests', () => {

    before(async function() {
        await mongoose.connect(MONGO_URI, MONGO_SETTINGS);
    });

    it('test get empty users', () => {
        return UserService.getAll(UserTestModel)
            .then((users: IUserModel[]) => {
                assert.equal(users.length, 0);
            });
    });

    it('test add user with role user', () => {
        return UserService.add('user', '123', 'user', UserTestModel)
            .then((result: IServiceResult) => {
                assert.equal(result.error, false);
            });
    });

    it('test add user with role manager', () => {
        return UserService.add('manager', '123', 'manager', UserTestModel)
            .then((result: IServiceResult) => {
                assert.equal(result.error, false);
            });
    });

    it('test add same user', () => {
        return UserService.add('user', '123', 'user', UserTestModel)
            .then((result: IServiceResult) => {
                assert.equal(result.error, true);
            });
    });

    it('test get all user', () => {
        return UserService.getAll(UserTestModel)
            .then((users: IUserModel[]) => {
                for (const user of users) {
                    assert.property(user, 'name');
                    assert.property(user, 'password');
                }
            });
    });

    it('test update user', () => {
        return UserService.update('user', '1234', 'user', UserTestModel)
            .then((result: IServiceResult) => {
                assert.equal(result.error, false);
            });
    });

    it('test get exist user with role user', () => {
        return UserService.get('user', UserTestModel)
            .then((result: IUserModel) => {
                assert.equal(result.name, 'user');
                assert.equal(result.role, 'user');
            });
    });

    it('test get exist user with role manager', () => {
        return UserService.get('manager', UserTestModel)
            .then((result: IUserModel) => {
                assert.equal(result.name, 'manager');
                assert.equal(result.role, 'manager');
            });
    });

    it('test remove user', () => {
        return UserService.delete('user', UserTestModel)
            .then((result: IServiceResult) => {
                assert.equal(result.error, false);
            });
    });

    it('test get do not exist user', () => {
        return UserService.get('user', UserTestModel)
            .then((result: IServiceResult) => {
                assert.equal(result.error, true);
            });
    });

    after(async function() {
        await UserTestModel.collection.drop();
        await mongoose.disconnect();
    });
});