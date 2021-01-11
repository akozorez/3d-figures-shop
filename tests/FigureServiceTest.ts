import { it } from 'mocha';
import { assert } from 'chai';
import FigureService from '../src/services/FigureService';
import { FigureModelTest, IFigureModel } from '../src/models/FigureModel';
import { IServiceResult } from '../src/services/interfaces';
import { UserModelTest } from '../src/models/UserModel';

it('test get empty figures', () => {
    return FigureService.getAll(FigureModelTest)
        .then((figures: IFigureModel[]) => {
            assert.equal(figures.length, 0);
        });
});

it('test add figure', () => {
    return FigureService.add('figure123', '/src/img/test.png', '/src/preview/test.png', 'manager', FigureModelTest, UserModelTest)
        .then((result: IServiceResult) => {
            assert.equal(result.error, false);
        });
});

it('test update figure', () => {
    return FigureService.update('figure123', 'figure', '/src/preview/test.png', 'manager', FigureModelTest)
        .then((result: IServiceResult) => {
            assert.equal(result.error, false);
        });
});

it('test get all', () => {
    return FigureService.getAll(FigureModelTest)
        .then((result: IFigureModel[]) => {
            for (const figure of result) {
                assert.property(figure, 'name');
                assert.property(figure, 'path');
            }
        });
});

it('test get exist figure', () => {
    return FigureService.get('figure', FigureModelTest)
        .then((result: IServiceResult) => {
            assert.property(result.data, 'name');
            assert.property(result.data, 'path');
        });
});

it('test get do not exist figure', async () => {
    return FigureService.get('figure123', FigureModelTest)
        .then((result: IServiceResult) => {
            assert.equal(result.error, true);
        });
});

it('test delete figure', () => {
    return FigureService.delete('figure', FigureModelTest)
        .then((result: IServiceResult) => {
            assert.equal(result.error, false);
        });
});

it('test add figure', () => {
    return FigureService.add('figure', '/src/img/test.png', '/src/preview/test.png', 'manager', FigureModelTest, UserModelTest)
        .then((result: IServiceResult) => {
            assert.equal(result.error, false);
        });
});
