import instance from '../lib/axios';

export const tasteApis = {
  postTasteSurvey: (tasteList: {
    acidity: number;
    body: number;
    sweetness: number;
    bitter: number;
    nutty: number;
    floral: number;
    fruit_flavor: number;
    cocoa_flavor: number;
    nutty_flavor: number;
  }) => instance.post('/api/taste/tests', tasteList),
  getTasteSurvey: () => instance.get('/api/taste/tests'),
};
