import * as actionTypes from "../actions";

const initialState = 4;

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return state + 1;
    case actionTypes.DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

export default counterReducer;
