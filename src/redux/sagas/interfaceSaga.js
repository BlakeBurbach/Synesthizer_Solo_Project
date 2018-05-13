import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* interfaceSaga() {
    yield takeEvery('POST_ALL_SYNTH_PARAMS', postAllSynthParams);
    yield takeEvery('FETCH_ALL_CREATION_DATA', fetchAllCreationData);
    yield takeEvery('DELETE_CREATION_OBJECT', deleteCreationObject);
    yield takeEvery('UPDATE_CREATION_TITLE', updateCreationTitle);
}

// Saga that handles axios POST route for sending all interface data to database
function* postAllSynthParams(action) {
    yield console.log('postAllSynthParams', action.payload);
    try {
        yield call(axios.post, '/api/creation', action.payload);
        yield put({
            type: 'FETCH_ALL_CREATION_DATA'
        })
    } catch (error) {
        alert('Something went wrong trying to save!');
        console.log('ERROR with postAllSynthParams', error);
    } // end try and catch
} // end postAllSynthParams

// Saga that handles axios GET route for retrieving Creation objects from database to send to List Page
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

// Saga function that handles axios DELETE route to delete Creation object from database
function* deleteCreationObject(action){
    try {
        yield call(axios.delete, `api/creation/${action.payload._id}`);
        yield put({
            type: 'FETCH_ALL_CREATION_DATA'
        })
    } catch (error) {
        console.log('ERROR with deleteCreationObject', error);
    } // end try and catch
} // end deleteCreationObject

function* updateCreationTitle(action){
    yield console.log('updateCreationTitle SAGA', action.payload);
    try{
         yield call(axios.put, `/api/creation/${action.payload.id}`, action.payload);
         yield put({
             type: 'FETCH_ALL_CREATION_DATA'
         })
    } catch (error) {
        console.log('updateCreationTitle ERROR', error);
    }
}

export default interfaceSaga;