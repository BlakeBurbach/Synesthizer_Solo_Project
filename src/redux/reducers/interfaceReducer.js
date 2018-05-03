import { combineReducers } from 'redux';
import { INTERFACE_ACTIONS } from '../actions/interfaceActions';

// synth1 reducer keeping track of synth1 state
const synth1 = (state = {}, action) => {
  switch (action.type) {
    case INTERFACE_ACTIONS.SYNTH_ONE_PARAMS:
      console.log('SYNTH_ONE_PARAMS',action.payload)
      // action.payload is the local state of synth1
      return action.payload;
    default:
      return state;
  } // end switch
}; // end synth1 reducer

// synth2 reducer keeping track of synth2 state
const synth2 = (state = {}, action) => {
  switch (action.type) {
    case INTERFACE_ACTIONS.SYNTH_TWO_PARAMS:
      console.log('SYNTH_TWO_PARAMS', action.payload)
      // action.payload is the local state of synth2
      return action.payload;
    default:
      return state;
  } // end switch
} // end synth2 reducer

// interfaceMasterControl reducer keeping track of the interface global params
const interfaceMasterControl = (state = {}, action) => {
  switch (action.type) {
    case INTERFACE_ACTIONS.INTERFACE_MASTER_PARAMS:
      console.log('INTERFACE_MASTER_PARAMS', action.type);
      return action.payload;
    default: 
      return state;
  } // end switch
} // end interfaceMasterControl reducer

export default combineReducers({
  synth1,
  synth2
})  