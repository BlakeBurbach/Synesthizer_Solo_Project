import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* interfaceSaga() {
    yield takeEvery('POST_ALL_SYNTH_PARAMS', postAllSynthParams);
}

function* postAllSynthParams(action) {
    yield console.log('postAllSynthParams', action.payload);
    try {
        yield call(axios.post, '/api/synth_interface', action.payload);
    } catch (error) {
        alert('Something went wrong trying to save!');
        console.log('ERROR with postAllSynthParams', error);
    } // end try and catch
} // end postAllSynthParams


export default interfaceSaga;