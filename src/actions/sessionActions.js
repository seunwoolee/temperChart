import my_axios from "../utils/my_axios";

export const SESSION_LOGIN = 'SESSION_LOGIN';
export const SESSION_LOGOUT = 'SESSION_LOGOUT';

export const storeLoginData = (token) => ({
  type: SESSION_LOGIN,
  token,
});

// export const testss = () => (dispatch) => dispatch({
//   type: SESSION_LOGIN
// });

// export const getUserData = () => {
//   const url = 'http://localhost:8000/employee/get_employee/';
//   return axios.post(url)
//     .then(res => {
//       // dispatch(storeLoginData(res.data.key));
//       return res;
//     })
//     .catch(error => (error.response));
// };

export const login = (username: string, password: string) => dispatch => {
  // const url = 'http://localhost:8000/rest-auth/login/';
  const authData = {
    username,
    password,
  };
  return my_axios.post('rest-auth/login/', authData)
    .then(res => {
      dispatch(storeLoginData(res.data.key));
      // getUserData();
      return res;
    })
    .catch(error => (error.response));
};


export const logout = () => (dispatch) => dispatch({
  type: SESSION_LOGOUT
});
