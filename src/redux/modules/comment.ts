import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  list: [
    {
      communityId: 1,
      commentId: '',
      userId: 'user1',
      comment: '맛있어보이네요!',
      createAt: '2022-01-01 10:30',
    },
  ],
};

export const commentSlice = createSlice({
  // 액션명
  name: 'commentReducer',
  initialState: INITIAL_STATE,
  reducers: {
    addComment: (state, action) => {
      const new_commentList = [
        ...state.list,
        {
          communityId: 1,
          commentId: '',
          userId: 'user1',
          comment: '카페가고싶다ㅠ',
          createAt: '2022-01-01 20:30',
        },
      ];
      return { list: new_commentList };
    },
  },
});
