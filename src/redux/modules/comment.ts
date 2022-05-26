import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { commentApis } from '../../apis/commentApis';
import { setIsMyCommentListLoaded } from './mypage';

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
        console.log(res);

        const newCommentList: Array<CommentItemDataParams> = [];
        res.data.data.content.map((comment: any) => {
          // 시간계산
          const today = new Date();
          const commentedDay = new Date(comment.createdAt);
          let newDate = '';
          let betweenTime = 0;
          betweenTime = Math.floor(
            (today.getTime() - commentedDay.getTime()) / 1000 / 60
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
        console.log(res);
        // 시간 계산
        const today = new Date();
        const commentedDay = new Date(res.data.data.createdAt);
        let newDate = '';
        let betweenTime = 0;
        betweenTime = Math.floor(
          (today.getTime() - commentedDay.getTime()) / 1000 / 60
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
        thunkAPI.dispatch(
          addComment({
            commentsId: res.data.data.id,
            content: res.data.data.content,
            createdAt: newDate,
            nickname: res.data.data.nickname,
          })
        );
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
  // getMyCommentDB,
  deleteCommentDB,
};

export { commentActionCreators };
