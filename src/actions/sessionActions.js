import axios from "../utils/my_axios";

export const SESSION_LOGIN = 'SESSION_LOGIN';
export const SESSION_LOGOUT = 'SESSION_LOGOUT';
export const PUSHSAVE = 'PUSHSAVE';
export const EXPIRATIONDATE = 3600


export const authSuccess = (data: Object) => ({
  type: SESSION_LOGIN,
  data,
});

export const pushSave = (data: Object) => ({
  type: PUSHSAVE,
  data,
});


export const authCheckState = () => dispatch => {
  const token = localStorage.getItem('token');
  const expirationDate = new Date(localStorage.getItem('expirationDate'));

  if (!token) {
    dispatch(logout())
  } else {
    if (expirationDate <= new Date()) {
      dispatch(logout())
    } else {
      dispatch(getUserData(token))
    }
  }
};

export const getUserData = (token) => dispatch => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token
  }
  const axiosConfig = {
    headers: headers
  };
  const data = {token: token};
  const url = 'employee/get_employee/';
  return axios.post(url, data, axiosConfig)
    .then(res => {
      console.log('[getUserData]', res);
      dispatch(authSuccess(res.data));
      return res;
    })
    .catch(error => (error.response));
};

export const login = (username: string, password: string) => dispatch => {
  const authData = {
    username,
    password,
  };
  return axios.post('rest-auth/login/', authData)
    .then(res => {
      const token = res.data.key;
      dispatch(getUserData(token))
      return res;
    })
    .catch(error => (error.response));
};


export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  return {
    type: SESSION_LOGOUT
  }
};
