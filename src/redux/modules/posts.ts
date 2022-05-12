import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface PostsItemDataParams {
  postsId: number;
  nickname: string;
  postsImage: string;
  title: string;
  content: string;
  createdAt: string;
  modifiedAt: string;
  tagName: Array<string>;
}

export interface PostsState {
  list: Array<PostsItemDataParams>;
}

interface AddPostsType {
  title: string;
  content: string;
  tagName: string[];
  postsImage: string;
  navi: any;
}

const INITIAL_STATE: PostsState = {
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

// 커뮤니티 리스트 불러오기
export const axiosGetPostsList = createAsyncThunk(
  'postsReducer/axiosGetPostsList',
  async () => {
    return axios
      .get('URL')
      .then((res) => {
        return res.data;
      })
      .catch((error) => console.log(error));
  }
);

// 커뮤니티 추가하기
export const axiosAddPosts = createAsyncThunk(
  'postsReducer/axiosAddPosts',
  async (data: AddPostsType, thunkAPI) => {
    return axios
      .post('URL', {
        title: data.title,
        content: data.content,
        tag_name: data.tagName,
        posts_image: data.postsImage,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log('커뮤니티글 등록성공');
        }
        thunkAPI.dispatch(addPosts(data));
      });
  }
);

export const postsSlice = createSlice({
  // 액션명
  name: 'postsReducer',
  initialState: INITIAL_STATE,
  reducers: {
    addPosts: (state, action: PayloadAction<AddPostsType>) => {
      // 날짜 생성 임시로 작성. API연결 후 삭제예정. moment가 편리하구나..
      const today = new Date();
      const year = today.getFullYear();
      const month = ('0' + (today.getMonth() + 1)).slice(-2);
      const day = ('0' + today.getDate()).slice(-2);
      const hours = ('0' + today.getHours()).slice(-2);
      const minutes = ('0' + today.getMinutes()).slice(-2);
      const dataString = `${year}-${month}-${day} ${hours}:${minutes}`;

      const new_postsList = [
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
      // 라우팅처리
      action.payload.navi('/posts');
      // state.list는 아예 에러나고, state:new_arr도 안먹힘. list:new_arr 하니까 됨.. 왜 작동하는지는 의문 아마 return하는곳 자체가 state 일지도..
      return { list: new_postsList };
    },
    // loadPosts:(state,action) => {
    //     return state.list;
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(
      axiosGetPostsList.fulfilled,
      (state: PostsState, action) => {
        return { list: [...action.payload] };
      }
    );
  },
});

export const { addPosts } = postsSlice.actions;

export default postsSlice;
