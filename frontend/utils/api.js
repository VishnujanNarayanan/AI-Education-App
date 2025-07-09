// frontend/utils/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.29.235:5000',
});

export default API;
