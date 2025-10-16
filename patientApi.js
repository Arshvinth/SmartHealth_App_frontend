// src/api/patientApi.js
import axios from 'axios';
import { API_BASE_URL } from './config.js'; // ✅ import your config

const API = axios.create({
  baseURL: `${API_BASE_URL}/api/patients`, // connects to /api/patients endpoints
  timeout: 10000,
});

// POST /api/patients/check-duplicate
export const checkDuplicate = async (data) => {
  const res = await API.post('/check-duplicate', data);
  return res.data;
};

// POST /api/patients/register
export const registerPatient = async (data) => {
  const res = await API.post('/register', data);
  return res.data;
};
