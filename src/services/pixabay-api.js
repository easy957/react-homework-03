import axios from 'axios';

const API_KEY = '20083881-2214319d02a94c8d12adf7e10';

function fetchImages(queryName, currentPage) {
  return axios
    .get(
      `https://pixabay.com/api/?q=${queryName}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then(res => {
      if (res.data.hits.length === 0) {
        return Promise.reject(new Error('Nothing found'));
      }

      return res;
    });
}

const api = {
  fetchImages,
};

export default api;
