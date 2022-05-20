import instance from '../lib/axios';

export const postApis = {
  getPostList: (page: number) =>
    instance.get('/api/posts', { params: { page } }),
  addPost: (data: FormData) =>
    instance.post('/api/posts', data, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }),
  editPost: (data: FormData) =>
    instance.post('/api/posts/update', data, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }),
  deletePost: (data: number) =>
    instance.post('/api/posts/delete', { posts_id: data }),
};
                                    