import axios from 'axios';
import { APP_BASE_URL } from '../utils/constants';

export const predictDiabetes = async (formData) => {
  try {
    const response = await axios.post(`${APP_BASE_URL}/predict`, formData);
    return response.data;
  } catch (error) {
    console.error('Error predicting diabetes:', error);
    throw error;
  }
};