import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { userApis } from '../../apis';
import { postApis } from '../../apis/postApis';
import { commentApis } from '../../apis/commentApis';
import { likeApis } from '../../apis/likeApis';
import dateCalculator from '../../utils/dateCalculator';

export interface PostsItemDataParams {
  postsId: number | undefined;
  nickname: string;
  profileUrl?: string;
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
  postsId: number;
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
  mypageTabsNum?: number;
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
  mypageTabsNum: 0,
};

// 유저 즐겨찾기, 좋아요, 게시글 카운트 set
export const getUserInfo = createAsyncThunk(
  'mypageReducer/getUserInfo',
  async (data, thunkAPI) => {
    try {
      await userApis.info().then((response) => {
        const userInfo = {
          favorite: response.data.data.favorites_count,
          likes: response.data.data.likes_count,
          activity: response.data.data.posts_count,
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
        const newList: Array<PostsItemDataParams> = [];
        res.data.data.content.map((post: any) => {
          let newTagStr = [];
          if (post.tag_name !== null) {
            newTagStr = post.tag_name.split(',');
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
        const newList: Array<PostsItemDataParams> = [];
        res.data.data.content.map((post: any) => {
          let newTagStr = [];
          if (post.tag_name !== null) {
            newTagStr = post.tag_name.split(',');
          }

          const newDate = dateCalculator(post.modified_at);

          newList.push({
            postsId: post.posts_id,
            nickname: post.nickname,
            profileUrl: post.profile_url,
            postsImage: post.posts_image,
            title: post.title,
            content: post.content,
            createdAt: post.created_at,
            modifiedAt: newDate,
            tagName: newTagStr,
            isLikes: post.isLikes,
            likesCount: post.likes_count,
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
        const newList: Array<CommentItemDataParams> = [];
        res.data.data.content.map((comment: any) => {
          // 날짜 계산
          const newDate = dateCalculator(comment.created_at);

          newList.push({
            postsId: comment.posts_id,
            commentsId: comment.comments_id,
            content: comment.content,
            createdAt: newDate,
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
    setIsListLikedLoaded: (state, action: PayloadAction<boolean>) => {
      state.isListLikedLoaded = action.payload;
    },
    setIsListMyActivityLoaded: (state, action: PayloadAction<boolean>) => {
      state.isListMyActivityLoaded = action.payload;
    },
    setIsMyCommentListLoaded: (state, action: PayloadAction<boolean>) => {
      state.isMyCommentListLoaded = action.payload;
    },
    deleteMyPost: (state, action: PayloadAction<number>) => {
      const newPostList = state.listMyActivity.filter((post) => {
        return post.postsId !== action.payload;
      });
      return { ...state, listMyActivity: newPostList };
    },
    deleteMyComment: (state, action: PayloadAction<number>) => {
      const newCommentList = state.myCommentList.filter((comment) => {
        return comment.commentsId !== action.payload;
      });
      return { ...state, myCommentList: newCommentList };
    },
    deleteListLiked: (state, action: PayloadAction<number>) => {
      const newList = state.listLiked.filter((post) => {
        return post.postsId !== action.payload;
      });
      state.listLiked = newList;
    },
    deleteMyCommentList: (state, action: PayloadAction<number>) => {
      const newList = state.myCommentList.filter((post) => {
        return post.postsId !== action.payload;
      });
      state.myCommentList = newList;
    },
    changeStatusLike: (state, action: PayloadAction<number>) => {
      state.listMyActivity.map((post) => {
        if (post.postsId === action.payload) {
          post.isLikes = 10;
        }
      });
    },
    changeStatusDislike: (state, action: PayloadAction<number>) => {
      state.listMyActivity.map((post) => {
        if (post.postsId === action.payload) {
          post.isLikes = null;
        }
      });
    },
    changeMypageTabsNum: (state, action: PayloadAction<number>) => {
      state.mypageTabsNum = action.payload;
    },
    deleteMyActivityCount: (state) => {
      --state.activity;
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
  setIsMyCommentListLoaded,
  deleteMyPost,
  deleteMyComment,
  changeStatusLike,
  changeStatusDislike,
  deleteListLiked,
  deleteMyCommentList,
  changeMypageTabsNum,
  deleteMyActivityCount,
} = mypageSlice.actions;

const mypageActionCreators = {
  getUserInfo,
  setIsListLikedLoaded,
  getPostsLikedDB,
  getPostListMine,
  getMyCommentDB,
};

export { mypageActionCreators };
