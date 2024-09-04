import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const url = `${API_BASE_URL}/auth`;
export const signupRequest = async (email, password,firstName) => {
  try {
    const response = await axios.post(`${url}/register`, { email, password,firstName });
    console.log(response); 
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginRequest = async (email, password) => {
  try {
    const response = await axios.post(`${url}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};