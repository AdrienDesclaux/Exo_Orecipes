import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const apiService = () => {
  const url = 'https://orecipes-api.onrender.com/api/recipes';
  const data = axios.get(url);
  return data;
};
