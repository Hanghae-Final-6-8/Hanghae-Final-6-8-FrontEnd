import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { postApis } from '../../apis/postApis';
import { likeApis } from '../../apis/likeApis';

export interface PostsItemDataParams {
  postsId: number | undefined;
  nickname: string;
  postsImage: File | string;
  title: string;
  content: string;
  createdAt: string;
  modifiedAt: string;
  tagName: Array<string>;
  isLikes?: number | null;
  likesCount?: number | null;
}

export interface PostsState {
  list: Array<PostsItemDataParams>;
  paging?: number;
  isLoading?: boolean;
  postsLoadedLen?: number;
  isListLoaded?: boolean;
}

const initialState: PostsState = {
  list: [],
  isLoading: false,
  paging: 0,
  postsLoadedLen: 0,
  isListLoaded: false,
};

// 커뮤니티 리스트 불러오기
export const getPostListDB = createAsyncThunk(
  'postsReducer/getPostListDB',
  async (data: number, thunkAPI) => {
    thunkAPI.dispatch(isLoading(true));
    try {
      await postApis.getPostList(data).then((res) => {
        const postList: Array<PostsItemDataParams> = [];
        // 페이징
        if (res.data.data.content.length !== 0) {
          thunkAPI.dispatch(setPageNum(++data));
        }
        console.log(res.data.data.content);
        res.data.data.content.map((post: any) => {
          let newTagStr = [];
          if (post.tag_name !== null) {
            const tagStr = post.tag_name.slice(1, post.tag_name.length - 1);
            newTagStr = tagStr.split(',');
          }

          postList.push({
            postsId: post.posts_id,
            title: post.title,
            content: post.content,
            tagName: newTagStr,
            postsImage: post.posts_image,
            nickname: post.nickname,
            createdAt: post.created_at,
            modifiedAt: post.modified_at,
            isLikes: post.isLikes,
            likesCount: post.likes_count,
          });
        });

        const postsLoadedLen = res.data.data.content.length;
        thunkAPI.dispatch(isLoading(false));
        thunkAPI.dispatch(setPost({ postList, postsLoadedLen }));
      });
    } catch (error) {
      thunkAPI.dispatch(isLoading(false));
      console.log(error);
    }
  }
);

interface formType {
  formData: FormData;
  navi: (to: string) => void;
  prevImage: string;
}

// * 커뮤니티 *
// 커뮤니티 추가하기
export const addPostDB = createAsyncThunk(
  'postsReducer/addPostDB',
  async (data: formType, thunkAPI) => {
    try {
      await postApis.addPost(data.formData).then((res) => {
        console.log(res.data.data);
        // 액션함수 타입맞추기
        const _tagName = res.data.data.tag_name.slice(
          1,
          res.data.data.tag_name.length - 1
        );
        const newTagName = _tagName.split(',');
        const addedData = {
          postsId: res.data.data.posts_id,
          nickname: res.data.data.nickname,
          title: res.data.data.title,
          content: res.data.data.content,
          tagName: newTagName,
          postsImage: res.data.data.posts_image,
          createdAt: res.data.data.created_at,
          modifiedAt: res.data.data.modified_at,
          isLikes: res.data.data.isLikes,
          likesCount: res.data.data.likes_count,
          navi: data.navi,
        };
        thunkAPI.dispatch(addPost(addedData));
      });
    } catch (error) {
      console.log(error);
    }
  }
);

// 커뮤니티 수정하기
export const editPostDB = createAsyncThunk(
  'postsReducer/editPostDB',
  async (data: formType, thunkAPI) => {
    try {
      await postApis.editPost(data.formData).then((res) => {
        console.log(res.data.data);
        // 액션함수 타입맞추기
        const _tagName = res.data.data.tag_name.slice(
          1,
          res.data.data.tag_name.length - 1
        );
        const newTagName = _tagName.split(',');
        const addedData = {
          postsId: res.data.data.posts_id,
          nickname: res.data.data.nickname,
          title: res.data.data.title,
          content: res.data.data.content,
          tagName: newTagName,
          postsImage: res.data.data.posts_image,
          createdAt: res.data.data.created_at,
          modifiedAt: res.data.data.modified_at,
          isLikes: res.data.data.isLikes,
          likesCount: res.data.data.likes_count,
          navi: data.navi,
        };

        thunkAPI.dispatch(editPost(addedData));
      });
    } catch (error) {
      console.log(error);
    }
  }
);

// 커뮤니티 삭제하기
export const deletePostDB = createAsyncThunk(
  'postsReducer/deletePostDB',
  async (data: number, thunkAPI) => {
    try {
      await postApis.deletePost(data).then((res) => {
        console.log(res);
        thunkAPI.dispatch(deletePost(data));
      });
    } catch (error) {
      console.log(error);
    }
  }
);

// * 좋아요 *
// 좋아요 추가
export const addLikeDB = createAsyncThunk(
  'postsReducer/addLikeDB',
  async (data: number, thunkAPI) => {
    try {
      await likeApis.addLike(data).then((res) => {
        console.log(res);
        thunkAPI.dispatch(addLike(data));
      });
    } catch (error) {
      console.log(error);
    }
  }
);
// 좋아요 삭제
export const deleteLikeDB = createAsyncThunk(
  'postsReducer/deleteLikeDB',
  async (data: number, thunkAPI) => {
    try {
      await likeApis.deleteLike(data).then((res) => {
        console.log(res);
        thunkAPI.dispatch(deleteLike(data));
      });
    } catch (error) {
      console.log(error);
    }
  }
);
// 좋아요 누른 게시물 조회
export const getPostsLikedDB = createAsyncThunk(
  'postsReducer/getPostsLikedDB',
  async (data, thunkAPI) => {
    try {
      await likeApis.getPostsLiked().then((res) => {
        console.log(res);
        const newList: Array<PostsItemDataParams> = [];
        res.data.data.content.map((post: any) => {
          let newTagStr = [];
          if (post.tag_name !== null) {
            const tagStr = post.tag_name.slice(1, post.tag_name.length - 1);
            newTagStr = tagStr.split(',');
          }
          newList.push({
            postsId: post.posts_id,
            nickname: post.nickname,
            postsImage: post.posts_image,
            title: post.title,
            content: post.content,
            createdAt: post.created_at,
            modifiedAt: post.modified_at,
            tagName: newTagStr,
          });
        });
        thunkAPI.dispatch(setPostLiked(newList));
      });
    } catch (error) {
      console.log(error);
    }
  }
);

// * reducer *

interface AddPostsType {
  postsId: number | undefined;
  nickname: string;
  title: string;
  content: string;
  tagName: string[];
  postsImage: File | string;
  createdAt?: string;
  modifiedAt?: string;
  isLikes?: number | null;
  likesCount?: number | null;
  navi: (to: string) => void;
}

export const postsSlice = createSlice({
  // 액션명
  name: 'postsReducer',
  initialState,
  reducers: {
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setPageNum: (state, action: PayloadAction<number>) => {
      state.paging = action.payload;
    },
    setPost: (state, action: PayloadAction<any>) => {
      const newList = [...state.list, ...action.payload.postList];
      return {
        ...state,
        list: newList,
        postsLoadedLen: action.payload.postsLoadedLen,
      };
    },
    setPostLiked: (
      state,
      action: PayloadAction<Array<PostsItemDataParams>>
    ) => {
      const newList = [...state.list, ...action.payload];
      return {
        list: newList,
        isLoading: false,
        postsLoadedLen: 0,
        paging: 0,
        isListLoaded: false,
      };
    },
    addPost: (state, action: PayloadAction<AddPostsType>) => {
      const new_postsList = [
        {
          postsId: action.payload.postsId ? action.payload.postsId : 0,
          nickname: action.payload.nickname ? action.payload.nickname : '',
          postsImage: action.payload.postsImage,
          title: action.payload.title,
          content: action.payload.content,
          createdAt: action.payload.createdAt ? action.payload.createdAt : '',
          modifiedAt: action.payload.modifiedAt
            ? action.payload.modifiedAt
            : '',
          tagName: action.payload.tagName,
          isLikes: action.payload.isLikes,
          likesCount: action.payload.likesCount,
        },
        ...state.list,
      ];

      action.payload.navi('/posts');
      return { ...state, list: new_postsList };
    },
    editPost: (state, action: PayloadAction<AddPostsType>) => {
      const post_edited = {
        postsId: action.payload.postsId,
        nickname: action.payload.nickname,
        postsImage: action.payload.postsImage,
        title: action.payload.title,
        content: action.payload.content,
        createdAt: action.payload.createdAt ? action.payload.createdAt : '',
        modifiedAt: action.payload.modifiedAt ? action.payload.modifiedAt : '',
        tagName: action.payload.tagName,
        isLikes: action.payload.isLikes,
        likesCount: action.payload.likesCount,
      };

      // 라우팅처리
      action.payload.navi('/posts');

      // return { ...state, list: [post_edited, ...new_list] };
      return {
        ...state,
        list: [post_edited, ...state.list],
      };
    },
    deletePost: (state, action: PayloadAction<number>) => {
      const new_list = state.list.filter((post) => {
        return post.postsId !== action.payload;
      });
      return { ...state, list: new_list };
    },
    addLike: (state, action: PayloadAction<number>) => {
      const idx = state.list.findIndex((post) => {
        return post.postsId === action.payload;
      });
      state.list[idx].isLikes = 1;
    },
    deleteLike: (state, action: PayloadAction<number>) => {
      const idx = state.list.findIndex((post) => {
        return post.postsId === action.payload;
      });
      state.list[idx].isLikes = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPostListDB.fulfilled, (state, action) => {
      if (state.list.length !== 0) {
        state.isListLoaded = true;
      }
    });
  },
});

export const {
  setPost,
  setPostLiked,
  setPageNum,
  addPost,
  editPost,
  deletePost,
  isLoading,
  addLike,
  deleteLike,
} = postsSlice.actions;

export default postsSlice;
