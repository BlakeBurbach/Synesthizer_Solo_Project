import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* interfaceSaga() {
    yield takeEvery('POST_ALL_SYNTH_PARAMS', postAllSynthParams);
    yield takeEvery('FETCH_ALL_CREATION_DATA', fetchAllCreationData);
}

// Saga that handles posting all interface data to database
function* postAllSynthParams(action) {
    // yield console.log('postAllSynthParams', action.payload);
    try {
        yield call(axios.post, '/api/creation', action.payload);
    } catch (error) {
        alert('Something went wrong trying to save!');
        console.log('ERROR with postAllSynthParams', error);
    } // end try and catch
} // end postAllSynthParams

// Saga that handles retrieving Creation objects from database to send to List Page
function* fetchAllCreationData(action){
    try {
        const creationResponseObjects = yield call(axios.get, '/api/creation');
        yield console.log('creationResponseObjects', creationResponseObjects.data);
        yield put({
            type: 'SET_LIST_PAGE',
            payload: creationResponseObjects.data
        })
    } catch (error) {
        console.log('ERROR with fetchAllCreationData', error);
    } // end try and catch
} // end fetchAllCreationData

export default interfaceSaga;