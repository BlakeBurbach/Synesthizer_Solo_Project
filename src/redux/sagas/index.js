import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import interfaceSaga from './interfaceSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    interfaceSaga()
    // watchIncrementAsync()
  ]);
}
