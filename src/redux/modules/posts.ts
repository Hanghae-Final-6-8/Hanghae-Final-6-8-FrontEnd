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
  postsId: number | undefined;
  title: string;
  content: string;
  tagName: string[];
  postsImage: string;
  navi: (to: string) => void;
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
export const axiosGetPostList = createAsyncThunk(
  'postsReducer/axiosGetPostList',
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
export const axiosAddPost = createAsyncThunk(
  'postsReducer/axiosAddPost',
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
        thunkAPI.dispatch(addPost(data));
      });
  }
);

export const postsSlice = createSlice({
  // 액션명
  name: 'postsReducer',
  initialState: INITIAL_STATE,
  reducers: {
    addPost: (state, action: PayloadAction<AddPostsType>) => {
      // 임시
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

      action.payload.navi('/posts');
      return { list: new_postsList };
    },
    editPost: (state, action: PayloadAction<AddPostsType>) => {
      const today = new Date();
      const year = today.getFullYear();
      const month = ('0' + (today.getMonth() + 1)).slice(-2);
      const day = ('0' + today.getDate()).slice(-2);
      const hours = ('0' + today.getHours()).slice(-2);
      const minutes = ('0' + today.getMinutes()).slice(-2);
      const dataString = `${year}-${month}-${day} ${hours}:${minutes}`;

      const prev_post = state.list.filter((post) => {
        return post.postsId === action.payload.postsId;
      });

      const new_list = state.list.filter((post) => {
        return post.postsId !== action.payload.postsId;
      });

      const post_edited = {
        postsId: prev_post[0].postsId,
        nickname: prev_post[0].nickname,
        postsImage: action.payload.postsImage,
        title: action.payload.title,
        content: action.payload.content,
        createdAt: prev_post[0].createdAt,
        modifiedAt: dataString,
        tagName: action.payload.tagName,
      };

      // 라우팅처리
      action.payload.navi('/posts');

      // return { list: [...state.list, { ...state.list[idx], ...post_edited }] };
      return { list: [post_edited, ...new_list] };
    },
    deletePost: (state, action: PayloadAction<number>) => {
      const new_list = state.list.filter((post) => {
        return post.postsId !== action.payload;
      });
      return { list: new_list };
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(axiosGetPostList.fulfilled, (state: PostsState, action) => {
  //     return { list: [...action.payload] };
  //   });
  // },
});

export const { addPost } = postsSlice.actions;

export default postsSlice;
