import axios from 'axios';
import toast from 'react-hot-toast';

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
      window.location.replace('/login');
      break;

    default:
      break;
  }

  throw error;
};

export async function GetRequest(url) {
  await axios
    .get(url)
    .then((res) => {
      return res.data;
    })
    .catch(function (err) {
      if (err.response) {
        throw_error(err);
      }
    });
}
export async function PostRequest(url, data = {}) {
  await axios
    .post(url, data)
    .then((res) => {
      return res.data;
    })
    .catch(function (err) {
      if (err.response) {
        throw_error(err);
      }
    });
}
