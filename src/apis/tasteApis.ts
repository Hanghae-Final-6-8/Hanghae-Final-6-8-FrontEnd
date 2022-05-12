import instance from '../lib/axios';

// 세부 수정 필요
export const tasteApis = {
  surveyStart: () => instance.post('/api/taste/tests'),
  surveyResult: () => instance.get('/api/taste/tests'),
};
