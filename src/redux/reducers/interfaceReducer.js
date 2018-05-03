import { combineReducers } from 'redux';
import { INTERFACE_ACTIONS } from '../actions/interfaceActions';

const synth1 = (state = {}, action) => {
    switch (action.type) {
      case INTERFACE_ACTIONS.SYNTH_ONE_STUFF:
        console.log(action.payload)
        return action.payload;
      default:
        return state;
    }
  };

export default combineReducers({
    synth1,
})  