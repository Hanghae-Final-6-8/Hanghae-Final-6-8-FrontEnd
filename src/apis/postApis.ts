import instance from '../lib/axios';

export const postApis = {
  getPostList: () => instance.get('/api/posts'),
};
