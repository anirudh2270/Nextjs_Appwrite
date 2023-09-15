import axios from 'axios';
import toast from 'react-hot-toast';

export const axios_instance = axios.create();

axios_instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  function (error) {
    console.log(error);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    throw_error(error);
  }
);

export const throw_error = (err) => {
  const error = new Error('An error occurred while fetching the data.');

  error.info = err.response.data;
  error.status = err.response.status;

  if (error.info.error.issues?.length > 0) {
    for (let i = 0; i < error.info.error.issues.length; i++) {
      toast.error(error.info.error.issues[i].message);
    }
  }

  if (typeof error.info.error == 'string') {
    toast.error(error.info.error);
  }

  switch (error.status) {
    case 401:
      localStorage.removeItem('email');
      window.location.replace('/login');
      break;

    default:
      break;
  }

  throw error;
};
