import instance from '../lib/axios';

export const likeApis = {
  addLike: (data: number) => instance.post('/api/likes', { posts_id: data }),
  deleteLike: (data: number) => instance.post('/api/likes', { posts_id: data }),
};
