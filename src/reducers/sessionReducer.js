import * as actionTypes from 'src/actions';
import {ISLOADING} from "src/actions";

const initialState = {
  loggedIn: false,
  isLoading: false,
  token: '',
  endpoint: null,
  user: {
    id: 'swl21803',
    name: '관리자',
    department: '전산팀',
    position: '부장',
    avatar: '/images/avatars/avatar_10.png',
  }
};

const sessionLogin = (state, action) => {
  const {data} = action;
  let endpoint = null;
  if (data.endpoint) {
    endpoint = data.endpoint;
  }
  return {
    ...state,
    loggedIn: true,
    token: data.token,
    endpoint,
    user: {
      id: data.user.username,
      name: data.user.first_name,
      department: data.department.name,
      position: data.position.name,
      avatar: `http://155.1.39.223:8000${data.avatar}`, // TODO URL 변경 필요
    }
  };
};

// const pushSave = (state, action) => ({
//   ...state,
//   endpoint: action.endpoint
// });

const pushSave = (state, action) => {
  return {
    ...state,
    endpoint: action.data.endpoint
}
};

const sessionLogout = (state, action) => ({
  ...state,
  token: null,
  loggedIn: false,
  user: {},
});

const isloading = (state, action) => ({
  ...state,
  isLoading: action.bool
  // isloading: !state.isLoading
});

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SESSION_LOGIN: return sessionLogin(state, action);
    case actionTypes.SESSION_LOGOUT: return sessionLogout(state, action);
    case actionTypes.PUSHSAVE: return pushSave(state, action);
    case actionTypes.ISLOADING: return isloading(state, action);
    default: return state;
  }
};

export default sessionReducer;
