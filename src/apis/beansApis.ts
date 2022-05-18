import instance from '../lib/axios';

export const beansApis = {
  getRandomBeans: () => instance.get('/api/beans/random'),
  getBeansList: () => instance.get('/api/beans/list'),
  serchBeans: (keyword: string) => instance.get(`/api/beans/list/${keyword}`),
  detailBeans: (beanId: number) => instance.get(`/api/beans/${beanId}`),
};
