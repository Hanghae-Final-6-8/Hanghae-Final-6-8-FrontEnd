import instance from '../lib/axios';

export const favoriteApis = {
  getFavoriteList: () => instance.get('/api/favorites/beans'),
  addFavoriteList: (data: number) =>
    instance.post('/api/favorites/beans', { bean_id: data }),
};
