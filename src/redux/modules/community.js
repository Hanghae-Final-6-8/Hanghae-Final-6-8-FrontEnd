import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  list: [
    {
      communityId: '',
      userId: 'test',
      userImg:
        'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg',
      tag: '일상',
      bgImg:
        'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg',
    },
    {
      communityId: '',
      userId: 'test',
      userImg:
        'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg',
      tag: '일상',
      bgImg:
        'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg',
    },
    {
      communityId: '',
      userId: 'test',
      userImg:
        'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg',
      tag: '일상',
      bgImg:
        'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg',
    },
  ],
};

export const communitySlice = createSlice({
  // 액션명
  name: 'communityReducer',
  initialState: INITIAL_STATE,
  reducers: {
    addCommunity: (state, action) => {
      const new_communityList = [
        ...state.list,
        {
          // 커뮤니티 아이디는 백단에서 생성할 예정
          communityId: '',
          userId: 'test1',
          userImg:
            'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg',
          tag: action.payload.commuTag,
          bgImg: '',
        },
      ];
      // state.list는 아예 에러나고, state:new_arr도 안먹힘. list:new_arr 하니까 됨.. 왜 작동하는지는 의문
      return { list: new_communityList };
    },
    // loadCommunity:(state,action) => {
    //     return state.list;
    // }
  },
});

export const { addCommunity } = communitySlice.actions;

export default communitySlice;
