import axios from 'axios';
import {axios_URL} from "../my_config";

let instance = axios.create({
  baseURL: axios_URL
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
