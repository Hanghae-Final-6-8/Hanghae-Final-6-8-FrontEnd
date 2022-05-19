import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { postApis } from '../../apis/postApis';
// 삭제예정
// import instance from '../../lib/axios';
// 삭제예정
// import axios from 'axios';

export interface PostsItemDataParams {
  postsId: number;
  nickname: string;
  postsImage: File | string;
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
  postsLoadedLen?: number;
}

interface AddPostsType {
  postsId: number | undefined;
  title: string;
  content: string;
  tagName: string[];
  postsImage: File | string;
  navi: (to: string) => void;
}

const INITIAL_STATE: PostsState = {
  list: [],
  paging: 0,
  isLoading: false,
  postsLoadedLen: 0,
};

// 커뮤니티 리스트 불러오기
export const axiosGetPostList = createAsyncThunk(
  'postsReducer/axiosGetPostList',
  async (data: number, thunkAPI) => {
    thunkAPI.dispatch(isLoading(true));
    try {
      await postApis.getPostList(data).then((res) => {
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

        const postsLoadedLen = res.data.content.length;
        thunkAPI.dispatch(isLoading(false));
        thunkAPI.dispatch(setPost({ post_list, postsLoadedLen }));
      });
    } catch (error) {
      thunkAPI.dispatch(isLoading(false));
      console.log(error);
    }

    // return await axios
    //   .get(`http://110.46.158.168:8090/api/posts?page=${data}`)
    //   .then((res) => {
    //     const post_list: Array<PostsItemDataParams> = [];
    //     console.log(res.data.content);
    //     // 페이징
    //     thunkAPI.dispatch(setPageNum(++data));

    //     res.data.content.map((post: any) => {
    //       const tagStr = post.tag_name.slice(1, post.tag_name.length - 1);
    //       const newTagStr = tagStr.split(',');
    //       post_list.push({
    //         postsId: post.posts_id,
    //         title: post.title,
    //         content: post.content,
    //         tagName: newTagStr,
    //         postsImage: post.posts_image,
    //         nickname: post.nickname,
    //         createdAt: post.created_at,
    //         modifiedAt: post.modified_at,
    //       });
    //     });

    //     const postsLoadedLen = res.data.content.length;
    //     thunkAPI.dispatch(isLoading(false));
    //     thunkAPI.dispatch(setPost({ post_list, postsLoadedLen }));
    //   })
    //   .catch((error) => {
    //     thunkAPI.dispatch(isLoading(false));
    //     console.log(error);
    //   });
  }
);

interface formType {
  formData: FormData;
  navi: (to: string) => void;
}
// 커뮤니티 추가하기
export const axiosAddPost = createAsyncThunk(
  'postsReducer/axiosAddPost',
  async (data: formType, thunkAPI) => {
    const dataArray = [];
    for (const d of data.formData.entries()) {
      dataArray.push(d[1]);
    }
    const tagArr = dataArray[2].toString();
    const tagArrSliced = tagArr.slice(1, tagArr.length - 1);
    const newTagArr = tagArrSliced.split(',');
    const toReduxData = {
      postsId: undefined,
      title: dataArray[0].toString(),
      content: dataArray[1].toString(),
      tagName: newTagArr,
      postsImage: dataArray[3],
      navi: data.navi,
    };
    console.log(toReduxData);
    try {
      await postApis.addPost(data.formData).then((res) => {
        console.log(res);
        console.log('커뮤니티글 등록성공');

        thunkAPI.dispatch(addPost(toReduxData));
      });
    } catch (error) {
      console.log(error);
    }

    // return axios({
    //   url: 'http://110.46.158.168:8090/api/posts',
    //   method: 'POST',
    //   data: data.formData,
    //   headers: {
    //     'content-type': 'multipart/form-data',
    //   },
    // })
    //   .then((res) => {
    //     console.log(res);
    //     console.log('커뮤니티글 등록성공');

    //     thunkAPI.dispatch(addPost(toReduxData));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }
);

// 커뮤니티 수정하기
export const axiosEditPost = createAsyncThunk(
  'postsReducer/axiosEditPost',
  async (data: formType, thunkAPI) => {
    const dataArray = [];
    for (const d of data.formData.entries()) {
      dataArray.push(d[1]);
    }
    const tagArr = dataArray[3].toString();
    const tagArrSliced = tagArr.slice(1, tagArr.length - 1);
    const newTagArr = tagArrSliced.split(',');
    const toReduxData = {
      postsId: Number(dataArray[0]),
      title: dataArray[1].toString(),
      content: dataArray[2].toString(),
      tagName: newTagArr,
      postsImage: dataArray[4],
      navi: data.navi,
    };
    console.log(toReduxData);
    try {
      await postApis.editPost(data.formData).then((res) => {
        console.log(res);
        console.log('커뮤니티글 수정성공');

        thunkAPI.dispatch(editPost(toReduxData));
      });
    } catch (error) {
      console.log(error);
    }

    // return axios({
    //   url: 'http://110.46.158.168:8090/api/posts/update',
    //   method: 'POST',
    //   data: data.formData,
    //   headers: {
    //     'content-type': 'multipart/form-data',
    //   },
    // })
    //   .then((res) => {
    //     console.log(res);
    //     console.log('커뮤니티글 수정성공');

    //     thunkAPI.dispatch(editPost(toReduxData));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }
);

// 커뮤니티 삭제하기
export const axiosDeletePost = createAsyncThunk(
  'postsReducer/axiosDeletePost',
  async (data: number, thunkAPI) => {
    try {
      await postApis.deletePost(data).then((res) => {
        console.log(res);
        thunkAPI.dispatch(deletePost(data));
      });
    } catch (error) {
      console.log(error);
    }

    // return axios
    //   .post('http://110.46.158.168:8090/api/posts/delete', {
    //     posts_id: data,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     thunkAPI.dispatch(deletePost(data));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
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
      state.paging = action.payload;
    },
    setPost: (state, action: PayloadAction<any>) => {
      const new_list = [...state.list, ...action.payload.post_list];
      return {
        ...state,
        list: new_list,
        postsLoadedLen: action.payload.postsLoadedLen,
      };
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
      return { ...state, list: new_postsList };
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
      return { ...state, list: [post_edited, ...new_list] };
    },
    deletePost: (state, action: PayloadAction<number>) => {
      const new_list = state.list.filter((post) => {
        return post.postsId !== action.payload;
      });
      return { ...state, list: new_list };
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(axiosGetPostList.fulfilled, (state: PostsState, action) => {
  //     return {...state, list: [...action.payload] };
  //   });
  // },
});

export const { setPost, setPageNum, addPost, editPost, deletePost, isLoading } =
  postsSlice.actions;

export default postsSlice;
