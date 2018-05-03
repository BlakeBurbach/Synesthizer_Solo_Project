import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* interfaceSaga() {
    yield takeEvery('GET_ALL_SYNTH_PARAMS', getAllSynthParams);
}

function* getAllSynthParams(action) {
    yield console.log('getAllSynthParams', action.payload);
}


export default interfaceSaga;