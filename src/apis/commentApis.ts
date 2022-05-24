import instance from '../lib/axios';
interface addCommentType {
  content: string;
  posts_id: number;
}
export const commentApis = {
  getCommentList: (posts_id: number) =>
    instance.get(`/api/comments/${posts_id}`, {}),
  getMyComment: () => instance.get('/api/comments/mine'),
  addComment: (data: addCommentType) =>
    instance.post('/api/comments', data, {}),
  deleteComment: (data: number) =>
    instance.post('/api/comments/delete', { comments_id: data }),
};
