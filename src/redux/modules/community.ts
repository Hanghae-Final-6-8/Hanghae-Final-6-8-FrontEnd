import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CommunityItemDataParams {
  postsId: number;
  nickname: string;
  postsImage: string;
  title: string;
  content: string;
  createdAt: string;
  modifiedAt: string;
  tagName: Array<string>;
}

export interface CommunityState {
  list: Array<CommunityItemDataParams>;
}

//변경해서 나중에 삭제해야..
interface AddPosts {
  title: string;
  content: string;
  tagName: string[];
  postsImage: string;
}

const INITIAL_STATE: CommunityState = {
  list: [
    // {
    //   postsId: 1,
    //   nickname: 'test',
    //   postsImage:
    //     'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg',
    //   title: '망원동 카페',
    //   content: '커피마시기 좋은 날',
    //   createdAt: '2022-01-01 17:30',
    //   modifiedAt: '',
    //   tagName: ['일상'],
    // },
  ],
};

export const communitySlice = createSlice({
  // 액션명
  name: 'communityReducer',
  initialState: INITIAL_STATE,
  reducers: {
    addCommunity: (state, action: PayloadAction<AddPosts>) => {
      // 날짜 생성함수. 임시로 작성. 삭제예정. moment가 편리하구나..
      const today = new Date();
      const year = today.getFullYear();
      const month = ('0' + (today.getMonth() + 1)).slice(-2);
      const day = ('0' + today.getDate()).slice(-2);
      const hours = ('0' + today.getHours()).slice(-2);
      const minutes = ('0' + today.getMinutes()).slice(-2);
      const dataString = `${year}-${month}-${day} ${hours}:${minutes}`;

      const new_communityList = [
        ...state.list,
        {
          postsId: Math.random(),
          nickname: 'test1',
          postsImage: action.payload.postsImage,
          title: action.payload.title,
          content: action.payload.content,
          createdAt: dataString,
          modifiedAt: '',
          tagName: action.payload.tagName,
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
