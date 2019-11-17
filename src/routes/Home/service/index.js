import api from 'api';
import fetchAPI from 'api/fetchAPI';

const Posts = {
  getPostList: (params) => fetchAPI.get(api.getPostList.url, { params }),

  getPostItem: ({ id }) => fetchAPI.get(`${api.getPostList.url}/${id}`)
};

export { Posts };
