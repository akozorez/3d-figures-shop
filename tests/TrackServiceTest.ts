import { it } from 'mocha';
import { assert } from 'chai';
import { FigureModelTest, IFigureModel } from '../src/models/FigureModel';
import { IServiceResult } from '../src/services/interfaces';
import { UserModelTest } from '../src/models/UserModel';
import { ITrackModel, TrackModelTest } from '../src/models/TrackModel';
import TrackService from '../src/services/TrackService';
import { statuses } from '../src/models/interfaces';

it('test get empty tracks', () => {
    return TrackService.getAll(TrackModelTest)
        .then((tracks: ITrackModel[]) => {
            assert.equal(tracks.length, 0);
        });
});

it('test add track', () => {
    return TrackService.add('manager', 'figure', 'Lobach', TrackModelTest, FigureModelTest, UserModelTest)
        .then((result: IServiceResult) => {
            assert.equal(result.error, false);
        });
});

it('test get tracks by user', () => {
    return TrackService.get('manager', TrackModelTest, UserModelTest)
        .then((result: ITrackModel[]) => {
            for (const track of result) {
                assert.equal(track.address, 'Lobach');
                assert.equal(track.status, statuses.Assembled);
            }
        });
});

it('test update tracks', async () => {
    let tracks = await TrackService.get('manager', TrackModelTest, UserModelTest);
    let id;
    for (const track of tracks) {
        id = track._id;
    }
    let result = await TrackService.update(id, statuses.Assembled, TrackModelTest);
    assert.equal(result.error, false);
});

it('test delete track', async () => {
    let tracks = await TrackService.get('manager', TrackModelTest, UserModelTest)
    let id = 0;
    for (const track of tracks) {
        id = track._id;
    }
    let result = await TrackService.delete(id, TrackModelTest);
    assert.equal(result.error, false);
});
