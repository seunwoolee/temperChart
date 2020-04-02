import axios from 'axios';

export default axios.create({
  baseURL: `http://155.1.39.223:8000/` // # TODO URL 변경 필요
});
