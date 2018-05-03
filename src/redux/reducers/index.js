import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import synthInterface from './interfaceReducer';

const store = combineReducers({
  user,
  login,
  synthInterface
});

export default store;
