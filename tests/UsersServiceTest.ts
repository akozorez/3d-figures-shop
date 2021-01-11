import { it } from 'mocha';
import { assert } from 'chai';
import UserService from '../src/services/UserService';
import { IUserModel, UserModelTest } from '../src/models/UserModel';
import { IServiceResult } from '../src/services/interfaces';

it('test get empty users', () => {
    return UserService.getAll(UserModelTest)
        .then((users: IUserModel[]) => {
            assert.equal(users.length, 0);
        });
});

it('test add user with role user', () => {
    return UserService.add('user', '123', 'user', UserModelTest)
        .then((result: IServiceResult) => {
            assert.equal(result.error, false);
        });
});

it('test add same user', () => {
    return UserService.add('user', '123', 'user', UserModelTest)
        .then((result: IServiceResult) => {
            assert.equal(result.error, true);
        });
});

it('test add user with role manager', () => {
    return UserService.add('manager', '123', 'manager', UserModelTest)
        .then((result: IServiceResult) => {
            assert.equal(result.error, false);
        });
});

it('test get all user', () => {
    return UserService.getAll(UserModelTest)
        .then((users: IUserModel[]) => {
            for (const user of users) {
                assert.property(user, 'name');
                assert.property(user, 'password');
            }
        });
});

it('test update user', () => {
    return UserService.update('user', '1234', 'user', UserModelTest)
        .then((result: IServiceResult) => {
            assert.equal(result.error, false);
        });
});

it('test get exist user with role user', () => {
    return UserService.get('user', UserModelTest)
        .then((result: IServiceResult) => {
            assert.equal(result.data.name, 'user');
            assert.equal(result.data.role, 'user');
        });
});

it('test remove user', () => {
    return UserService.delete('user', UserModelTest)
        .then((result: IServiceResult) => {
            assert.equal(result.error, false);
        });
});

it('test get exist user with role manager', () => {
    return UserService.get('manager', UserModelTest)
        .then((result: IServiceResult) => {
            assert.equal(result.data.name, 'manager');
            assert.equal(result.data.role, 'manager');
        });
});

it('test get do not exist user', async () => {
    return UserService.get('user', UserModelTest)
        .then((result: IServiceResult) => {
            assert.equal(result.error, true);
        });
});