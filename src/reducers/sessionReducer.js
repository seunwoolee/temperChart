import * as actionTypes from 'src/actions';

const initialState = {
  loggedIn: false,
  token: '',
  user: {
    id: 'swl21803',
    name: '관리자',
    department: '전산팀',
    position: '부장',
    avatar: '/images/avatars/avatar_10.png',
  }
};

// const authSuccess = (state, action) => ({
//   ...state,
//   token: action.token,
//   userId: action.userId,
//   error: null,
//   loading: false
// });
//
// const authLogout = (state, action) => ({
//   ...state,
//   token: null,
//   userId: null
// });

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SESSION_LOGIN: {
      console.log('[sessionReducer]');
      return {
        ...initialState,
        token: action.token
      };
    }

    case actionTypes.SESSION_LOGOUT: {
      return {
        ...state,
        loggedIn: false,
        user: {
          role: 'GUEST'
        }
      };
    }

    default: {
      return state;
    }
  }
};

export default sessionReducer;
