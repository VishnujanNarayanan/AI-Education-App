import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.29.235:5000', // ✅ Ensure no slash
});

export default API;
