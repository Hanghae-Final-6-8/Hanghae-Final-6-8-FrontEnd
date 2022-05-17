import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../lib/axios';
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
  paging?: number;
  isLoading?: boolean;
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
  list: [],
  paging: 0,
  isLoading: false,
};

// 커뮤니티 리스트 불러오기
export const axiosGetPostList = createAsyncThunk(
  'postsReducer/axiosGetPostList',
  async (data: number, thunkAPI) => {
    console.log(data);
    thunkAPI.dispatch(isLoading(true));
    // return await instance
    // .get(`/api/posts?page=${data}`)
    return await axios
      .get(`http://110.46.158.168:8091/api/posts?page=${data}`)
      .then((res) => {
        const post_list: Array<PostsItemDataParams> = [];
        console.log(res.data.content);
        // 페이징
        thunkAPI.dispatch(setPageNum(++data));

        res.data.content.map((post: any) => {
          const tagStr = post.tag_name.slice(1, post.tag_name.length - 1);
          const newTagStr = tagStr.split(',');
          post_list.push({
            postsId: post.posts_id,
            title: post.title,
            content: post.content,
            tagName: newTagStr,
            postsImage: post.posts_image,
            nickname: post.nickname,
            createdAt: post.created_at,
            modifiedAt: post.modified_at,
          });
        });
        console.log(post_list);

        thunkAPI.dispatch(setPost(post_list));
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
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setPageNum: (state, action: PayloadAction<number>) => {
      console.log(action.payload);
      state.paging = action.payload;
    },
    setPost: (state, action: PayloadAction<any>) => {
      const new_list = [...state.list, ...action.payload];
      return { ...state, list: new_list, isLoading: false };
    },
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

export const { setPost, setPageNum, addPost, editPost, deletePost, isLoading } =
  postsSlice.actions;

export default postsSlice;
