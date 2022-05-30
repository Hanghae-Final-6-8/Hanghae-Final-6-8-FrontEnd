import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { commentApis } from '../../apis/commentApis';
import { setIsMyCommentListLoaded } from './mypage';
import { deleteMyComment } from './mypage';
import dateCalculator from '../../utils/dateCalculator';

export interface CommentItemDataParams {
  // postsId: number | null;
  commentsId: number;
  nickname?: string;
  content: string;
  createdAt: string;
}

export interface CommentState {
  list: Array<CommentItemDataParams>;
}

const initialState: CommentState = {
  list: [],
};
// 댓글 조회
export const getCommentListDB = createAsyncThunk(
  'commentReducer/getCommentListDB',
  async (data: number, thunkAPI) => {
    try {
      await commentApis.getCommentList(data).then((res) => {
        const newCommentList: Array<CommentItemDataParams> = [];
        res.data.data.content.map((comment: any) => {
          // 날짜계산
          const newDate = dateCalculator(comment.created_at);

          newCommentList.push({
            commentsId: comment.comments_id,
            nickname: comment.nickname,
            content: comment.content,
            createdAt: newDate,
          });
        });
        thunkAPI.dispatch(setCommentList(newCommentList));
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
        // 날짜 계산
        const newDate = dateCalculator(res.data.data.created_at);

        thunkAPI.dispatch(
          addComment({
            commentsId: res.data.data.comments_id,
            content: res.data.data.content,
            createdAt: newDate,
            nickname: res.data.data.nickname,
          })
        );
        thunkAPI.dispatch(setIsMyCommentListLoaded(false));
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
        thunkAPI.dispatch(deleteComment(data));
        thunkAPI.dispatch(setIsMyCommentListLoaded(false));
        thunkAPI.dispatch(deleteMyComment(data));
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
      return { list: action.payload };
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
  deleteCommentDB,
};

export { commentActionCreators };
