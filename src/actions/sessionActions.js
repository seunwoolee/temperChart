import axios from "../utils/my_axios";

export const SESSION_LOGIN = 'SESSION_LOGIN';
export const SESSION_LOGOUT = 'SESSION_LOGOUT';
export const PUSHSAVE = 'PUSHSAVE';
export const ISLOADING = 'ISLOADING';
export const TODO_COUNT_SIGN = 'TODO_COUNT_SIGN';
export const TODO_COUNT_ERP = 'TODO_COUNT_ERP';
export const EXPIRATIONDATE = 3600;

export const authSuccess = (data) => ({
  type: SESSION_LOGIN,
  data,
});

export const pushSave = (data) => ({
  type: PUSHSAVE,
  data,
});

export const todoCountSingSave = (data) => ({
  type: TODO_COUNT_SIGN,
  data,
});

export const todoCountErpSave = (data) => ({
  type: TODO_COUNT_ERP,
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
      dispatch(authSuccess(res.data));
      return res;
    })
    .catch(error => (error.response));
};

export const login = (username, password) => dispatch => {
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


export const isloading = (bool) => {
  return {
    type: ISLOADING,
    bool: bool
  }
};

export const getTodoCount = (token) => dispatch => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token
  }
  const axiosConfig = {
    headers: headers
  };
  const url = 'ea/get_todo_count/';
  return axios.get(url, axiosConfig)
    .then(res => {
      dispatch(todoCountSingSave(res.data));
    })
    .catch(error => (error.response));
}

export const getErpTodoCount = (token) => dispatch => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token
  }
  const axiosConfig = {
    headers: headers
  };
  const url = 'erp/get_todo_count/';
  return axios.get(url, axiosConfig)
    .then(res => {
      dispatch(todoCountErpSave(res.data));
    })
    .catch(error => {
      console.log(error.response)
    });
}
