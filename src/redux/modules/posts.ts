import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { postApis } from '../../apis/postApis';
import { likeApis } from '../../apis/likeApis';
import { setIsListLikedLoaded } from './mypage';
import { setIsListMyActivityLoaded } from './mypage';
import { deleteMyPost } from './mypage';

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
  post?: PostsItemDataParams;
  paging?: number;
  isLoading?: boolean;
  postsLoadedLen?: number;
  isListLoaded?: boolean;
}

const initialState: PostsState = {
  list: [],
  post: {
    postsId: 0,
    nickname: '',
    postsImage: '',
    title: '',
    content: '',
    createdAt: '',
    modifiedAt: '',
    tagName: [],
    isLikes: null,
    likesCount: null,
  },
  isLoading: false,
  paging: 0,
  postsLoadedLen: 0,
  isListLoaded: false,
};

// * 커뮤니티 *
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

        // console.log(res.data.data.content);
        res.data.data.content.map((post: any) => {
          let newTagStr = [];
          if (post.tag_name !== null) {
            newTagStr = post.tag_name.split(',');
          } else {
            newTagStr.push('');
          }

          const today = new Date();
          const postedDay = new Date(post.created_at);
          let newDate = '';
          let betweenTime = 0;
          betweenTime = Math.floor(
            (today.getTime() - postedDay.getTime()) / 1000 / 60
          );
          if (betweenTime < 1) {
            newDate = '방금전';
          } else if (betweenTime < 60) {
            newDate = `${betweenTime}분전`;
          }
          if (betweenTime > 60) {
            betweenTime = Math.floor(betweenTime / 60);
            if (betweenTime < 24) {
              newDate = `${betweenTime}시간전`;
            } else if (betweenTime > 24) {
              betweenTime = Math.floor(betweenTime / 60 / 24);
              newDate = `${betweenTime}일전`;
            } else if (betweenTime > 365) {
              betweenTime = Math.floor(betweenTime / 365);
              newDate = `${betweenTime}년전`;
            }
          }

          postList.push({
            postsId: post.posts_id,
            title: post.title,
            content: post.content,
            tagName: newTagStr,
            postsImage: post.posts_image,
            nickname: post.nickname,
            createdAt: newDate,
            modifiedAt: post.modified_at,
            isLikes: post.isLikes,
            likesCount: post.likes_count,
          });
        });

        const postsLoadedLen = res.data.data.content.length;
        thunkAPI.dispatch(isLoading(false));
        thunkAPI.dispatch(setPostList({ postList, postsLoadedLen }));
      });
    } catch (error) {
      thunkAPI.dispatch(isLoading(false));
      console.log(error);
    }
  }
);

// 커뮤니티 게시글 상세보기
export const getPostDB = createAsyncThunk(
  'postsReducer/getPostDB',
  async (data: number, thunkAPI) => {
    try {
      await postApis.getPostDetail(data).then((res) => {
        let newTagStr = [];
        if (res.data.data.tag_name !== null) {
          newTagStr = res.data.data.tag_name.split(',');
        }
        // 날짜 계산
        const today = new Date();
        const postedDay = new Date(res.data.data.created_at);
        let newDate = '';
        let betweenTime = 0;
        betweenTime = Math.floor(
          (today.getTime() - postedDay.getTime()) / 1000 / 60
        );
        if (betweenTime < 1) {
          newDate = '방금전';
        } else if (betweenTime < 60) {
          newDate = `${betweenTime}분전`;
        }
        if (betweenTime > 60) {
          betweenTime = Math.floor(betweenTime / 60);
          if (betweenTime < 24) {
            newDate = `${betweenTime}시간전`;
          } else if (betweenTime > 24) {
            betweenTime = Math.floor(betweenTime / 60 / 24);
            newDate = `${betweenTime}일전`;
          } else if (betweenTime > 365) {
            betweenTime = Math.floor(betweenTime / 365);
            newDate = `${betweenTime}년전`;
          }
        }
        // console.log(newDate);
        const post = {
          postsId: res.data.data.posts_id,
          nickname: res.data.data.nickname,
          postsImage: res.data.data.posts_image,
          title: res.data.data.title,
          content: res.data.data.content,
          createdAt: newDate,
          modifiedAt: res.data.data.modified_at,
          tagName: newTagStr,
          isLikes: res.data.data.isLikes,
          likesCount: res.data.data.likes_count,
        };
        thunkAPI.dispatch(setPost(post));
        thunkAPI.dispatch(isLoading(false));
      });
    } catch (error) {
      console.log(error);
    }
  }
);

interface formType {
  formData: FormData;
  navi: (to: string) => void;
  previewImage: string;
}

// 커뮤니티 추가하기
export const addPostDB = createAsyncThunk(
  'postsReducer/addPostDB',
  async (data: formType, thunkAPI) => {
    try {
      await postApis.addPost(data.formData).then((res) => {
        const newTagName = res.data.data.tag_name.split(',');
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
        thunkAPI.dispatch(setIsListMyActivityLoaded(false));
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
        // console.log(res.data.data);
        // 액션함수 타입맞추기
        const newTagName = res.data.data.tag_name.split(',');
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
        thunkAPI.dispatch(setIsListMyActivityLoaded(false));
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
        thunkAPI.dispatch(setIsListMyActivityLoaded(false));
        thunkAPI.dispatch(deleteMyPost(data));
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
      // console.log(data);
      await likeApis.addLike(data).then((res) => {
        // console.log(res);
        thunkAPI.dispatch(addLike(data));
        // 좋아요누른 게시물 재랜더링위해
        thunkAPI.dispatch(setIsListLikedLoaded(false));
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
      console.log(data);
      await likeApis.deleteLike(data).then((res) => {
        console.log(res);
        thunkAPI.dispatch(deleteLike(data));
        // 좋아요누른 게시물 재랜더링위해
        thunkAPI.dispatch(setIsListLikedLoaded(false));
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
    setPostList: (state, action: PayloadAction<any>) => {
      const newList = [...state.list, ...action.payload.postList];
      return {
        ...state,
        list: newList,
        postsLoadedLen: action.payload.postsLoadedLen,
      };
    },
    setPost: (state, action: PayloadAction<PostsItemDataParams>) => {
      const newPost = { ...state.post, ...action.payload };
      return { ...state, post: newPost };
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
      const editList = state.list.filter((post) => {
        return post.postsId !== action.payload.postsId;
      });
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
      // action.payload.navi('/posts');
      action.payload.navi('/posts');

      return {
        ...state,
        list: [post_edited, ...editList],
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
      // 다음과 같이 likesCount값을 cnt에 재정의한 원인: likesCount를 null로 초기화했기때문
      const likesCnt = state.list[idx].likesCount;
      const cnt = likesCnt === null ? 0 : likesCnt;
      state.list[idx].likesCount = cnt! + 1;
    },
    deleteLike: (state, action: PayloadAction<number>) => {
      const idx = state.list.findIndex((post) => {
        return post.postsId === action.payload;
      });
      state.list[idx].isLikes = null;
      const likesCnt = state.list[idx].likesCount;
      const cnt = likesCnt === null ? 0 : likesCnt;
      state.list[idx].likesCount = cnt! - 1;
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
  setPostList,
  setPost,
  setPageNum,
  addPost,
  editPost,
  deletePost,
  isLoading,
  addLike,
  deleteLike,
} = postsSlice.actions;

export default postsSlice;

const postActionCreators = {
  getPostListDB,
  getPostDB,
  addPostDB,
  editPostDB,
  deletePostDB,
  addLikeDB,
  deleteLikeDB,
};

export { postActionCreators };
