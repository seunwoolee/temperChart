import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import counterReducer from './counterReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  counter: counterReducer
});

export default rootReducer;
