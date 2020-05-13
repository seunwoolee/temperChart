import axios from 'axios';

let instance = axios.create({
  baseURL: `http://155.1.39.223:8000/`
  // baseURL: `https://kcfamily.kr/` // TODO URL 변경 필요
})

// instance.interceptors.response.use((res) => {
//   return res;
// }, (error) => {
//   // console.log(error);
//   // alert('에러발생', error.message);
//   return error;
// })

export default instance;
