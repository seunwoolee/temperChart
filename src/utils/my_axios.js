import axios from 'axios';

export default axios.create({
  baseURL: `http://localhost:8000/` // # TODO URL 변경 필요
});
