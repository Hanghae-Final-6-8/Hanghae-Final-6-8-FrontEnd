import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { userApis } from '../../apis';
import { postApis } from '../../apis/postApis';
import { commentApis } from '../../apis/commentApis';
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

export interface CommentItemDataParams {
  commentsId: number;
  nickname?: string;
  content: string;
  createdAt: string;
}

interface mypageType {
  listLiked: Array<PostsItemDataParams>;
  listMyActivity: Array<PostsItemDataParams>;
  myCommentList: Array<CommentItemDataParams>;
  favorite: number;
  likes: number;
  activity: number;
  isListLikedLoaded?: boolean;
  isListMyActivityLoaded?: boolean;
  isMyCommentListLoaded?: boolean;
}

const initialState: mypageType = {
  listLiked: [],
  listMyActivity: [],
  myCommentList: [],
  favorite: 0,
  likes: 0,
  activity: 0,
  isListLikedLoaded: false,
  isListMyActivityLoaded: false,
  isMyCommentListLoaded: false,
};

// 유저 즐겨찾기, 좋아요, 게시글 카운트 set
export const getUserInfo = createAsyncThunk(
  'mypageReducer/getUserInfo',
  async (data, thunkAPI) => {
    try {
      await userApis.info().then((response) => {
        const userInfo = {
          favorite: response.data.data.favorites_count,
          likes: response.data.data.posts_count,
          activity: response.data.data.likes_count,
        };
        thunkAPI.dispatch(setFavorLikeActivity(userInfo));
      });
    } catch (error) {
      console.log(error);
    }
  }
);

// 좋아요 누른 게시물 조회
export const getPostsLikedDB = createAsyncThunk(
  'mypageReducer/getPostsLikedDB',
  async (data, thunkAPI) => {
    try {
      await likeApis.getPostsLiked().then((res) => {
        // console.log(res);
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

// 내가 쓴 게시글 불러오기
export const getPostListMine = createAsyncThunk(
  'mypageReducer/getPostListMine',
  async (data, thunkAPI) => {
    try {
      await postApis.getPostListMine().then((res) => {
        // console.log(res);
        // console.log(res.data.data.content);
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
        thunkAPI.dispatch(setPostActivity(newList));
      });
    } catch (error) {
      console.log(error);
    }
  }
);

// 내 댓글 조회
export const getMyCommentDB = createAsyncThunk(
  'mypageReducer/getMyCommentDB',
  async (data, thunkAPI) => {
    try {
      await commentApis.getMyComment().then((res) => {
        // console.log(res.data.data.content);
        const newList: Array<CommentItemDataParams> = [];
        res.data.data.content.map((comment: any) => {
          newList.push({
            commentsId: comment.id,
            content: comment.content,
            createdAt: comment.createdAt,
          });
        });
        thunkAPI.dispatch(setMyCommentList(newList));
      });
    } catch (error) {
      console.log(error);
    }
  }
);

// * reducer *
interface userInfoCountType {
  favorite: number;
  likes: number;
  activity: number;
}

export const mypageSlice = createSlice({
  name: 'mypageReducer',
  initialState,
  reducers: {
    setFavorLikeActivity: (state, action: PayloadAction<userInfoCountType>) => {
      return { ...state, ...action.payload };
    },
    setPostLiked: (
      state,
      action: PayloadAction<Array<PostsItemDataParams>>
    ) => {
      const newListLiked = [...action.payload];
      return {
        ...state,
        listLiked: newListLiked,
      };
    },
    setPostActivity: (
      state,
      action: PayloadAction<Array<PostsItemDataParams>>
    ) => {
      const newListActivity = [...action.payload];
      return {
        ...state,
        listMyActivity: newListActivity,
      };
    },
    setMyCommentList: (
      state,
      action: PayloadAction<Array<CommentItemDataParams>>
    ) => {
      const newMyCommentList = [...action.payload];
      return {
        ...state,
        myCommentList: newMyCommentList,
      };
    },
    // 삭제예정
    setIsListLikedLoaded: (state, action: PayloadAction<boolean>) => {
      state.isListLikedLoaded = action.payload;
    },
    // 삭제예정
    setIsListMyActivityLoaded: (state, action: PayloadAction<boolean>) => {
      state.isListMyActivityLoaded = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPostsLikedDB.fulfilled, (state, action) => {
      if (state.listLiked.length !== 0) {
        state.isListLikedLoaded = true;
      }
    });
    builder.addCase(getPostListMine.fulfilled, (state, action) => {
      if (state.listMyActivity.length !== 0) {
        state.isListMyActivityLoaded = true;
      }
    });
    builder.addCase(getMyCommentDB.fulfilled, (state, action) => {
      if (state.myCommentList.length !== 0) {
        state.isMyCommentListLoaded = true;
      }
    });
  },
});

export default mypageSlice;

export const {
  setFavorLikeActivity,
  setPostLiked,
  setPostActivity,
  setMyCommentList,
  setIsListLikedLoaded,
  setIsListMyActivityLoaded,
} = mypageSlice.actions;

const mypageActionCreators = {
  getUserInfo,
  setIsListLikedLoaded,
  getPostsLikedDB,
  getPostListMine,
  getMyCommentDB,
};

export { mypageActionCreators };
