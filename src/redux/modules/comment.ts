import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { commentApis } from '../../apis/commentApis';

export interface CommentItemDataParams {
  // postsId: number | null;
  commentsId: number;
  nickname: string;
  content: string;
  createdAt: string;
}

export interface CommentState {
  list: Array<CommentItemDataParams>;
}

const initialState: CommentState = {
  list: [],
  // myCommentList:[]
};
// 댓글 조회
export const getCommentListDB = createAsyncThunk(
  'commentReducer/getCommentListDB',
  async (data: number, thunkAPI) => {
    try {
      await commentApis.getCommentList(data).then((res) => {
        // 어떻게 넘어오는지 확인필요
        console.log(res);
        // const newCommentList: Array<CommentItemDataParams> = [];
        // res.data.data.content.map((comment) => {
        //   newCommentList.push({
        //     commentsId: comment.comments_id,
        //     nickname: comment.nickname,
        //     content: comment.content,
        //     createdAt: comment.created_at,
        //   });
        // });
        // thunkAPI.dispatch(setCommentList(newCommentList));
      });
    } catch (error) {
      console.log(error);
    }
  }
);
// 내 댓글 조회
export const getMyCommentDB = createAsyncThunk(
  'commentReducer/getMyCommentDB',
  async () => {
    try {
      await commentApis.getMyComment().then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  }
);

interface addCommentType {
  content: string;
  posts_id: number;
}
// 댓글 등록
export const addCommentDB = createAsyncThunk(
  'commentReducer/addCommentDB',
  async (data: addCommentType, thunkAPI) => {
    try {
      await commentApis.addComment(data).then((res) => {
        console.log(res);
        // 커뮤니티처럼 댓글정보 다 와야함다고 요청
        // code here
      });
    } catch (error) {
      console.log(error);
    }
  }
);
// 댓글 삭제
export const deleteCommentDB = createAsyncThunk(
  'commentReducer/deleteCommentDB',
  async (data: number, thunkAPI) => {
    try {
      await commentApis.deleteComment(data).then((res) => {
        console.log(res);
        thunkAPI.dispatch(deleteComment(data));
      });
    } catch (error) {
      console.log(error);
    }
  }
);

export const commentSlice = createSlice({
  // 액션명
  name: 'commentReducer',
  initialState,
  reducers: {
    setCommentList: (
      state,
      action: PayloadAction<Array<CommentItemDataParams>>
    ) => {
      // const newList = [...state.list,action.payload];
      // return {...state, list:newList};
      action.payload.map((comment) => {
        state.list.push(comment);
      });
    },
    addComment: (state, action: PayloadAction<CommentItemDataParams>) => {
      const new_commentList = [
        ...state.list,
        {
          commentsId: action.payload.commentsId,
          nickname: action.payload.nickname,
          content: action.payload.content,
          createdAt: action.payload.createdAt,
        },
      ];
      return { ...state, list: new_commentList };
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      const new_list = state.list.filter((comment) => {
        return comment.commentsId !== action.payload;
      });

      return { ...state, list: new_list };
    },
  },
});

export default commentSlice;

export const { setCommentList, addComment, deleteComment } =
  commentSlice.actions;

const commentActionCreators = {
  addCommentDB,
  getCommentListDB,
  getMyCommentDB,
  deleteCommentDB,
};

export { commentActionCreators };
