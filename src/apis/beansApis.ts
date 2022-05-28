import instance from '../lib/axios';

export const beansApis = {
  getBeansList: (page: number) =>
    instance.get('/api/beans/list', { params: { page } }),
  getBeansListType: (type: number) =>
    instance.get('/api/beans/list', {
      params: { type },
    }),
  searchBeans: (keyword: string) => instance.get(`/api/beans/list/${keyword}`),
  detailBeans: (beanId: number) => instance.get(`/api/beans/${beanId}`),
};
