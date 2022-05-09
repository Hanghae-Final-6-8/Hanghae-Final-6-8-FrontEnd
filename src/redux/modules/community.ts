import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CommunityItemDataParams {
  communityId: string;
  userId: string;
  userImg: string;
  tag: string;
  bgImg: string;
}

export interface CommunityState {
  list: Array<CommunityItemDataParams>;
}

interface AddState {
  commuTitle: string;
  commuTag: string;
}

const INITIAL_STATE: CommunityState = {
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
    addCommunity: (state, action: PayloadAction<AddState>) => {
      const new_communityList = [
        ...state.list,
        {
          communityId: '',
          userId: 'test1',
          userImg:
            'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg',
          tag: '',
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
