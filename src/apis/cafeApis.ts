import instance from '../lib/axios';

export const cafeApis = {
  getCafeList: () => instance.get('/api/cafe/list'),
  getBeansListByCafe: (cafeId: number) =>
    instance.get(`/api/cafe/${cafeId}/beans`),
};
