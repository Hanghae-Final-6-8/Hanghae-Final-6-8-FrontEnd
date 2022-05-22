import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { commentApis } from '../../apis/commentApis';

export interface CommentItemDataParams {
  postsId: number | null;
  commentsId: number;
  nickname: string;
  content: string;
  createdAt: string;
  modifiedAt: string | null;
}

export interface CommentState {
  list: Array<CommentItemDataParams>;
}

interface AddCommentType {
  postsId: number;
  comment: string;
}

const INITIAL_STATE: CommentState = {
  list: [
    // {
    //   postsId: 1,
    //   commentsId: 1,
    //   nickname: 'user1',
    //   content: '맛있어보이네요!',
    //   createdAt: '2022-01-01 10:30',
    //   modifiedAt: '',
    // },
  ],
};
// 댓글 조회
export const getCommentListDB = createAsyncThunk(
  'commentReducer/getCommentListDB',
  async (data: number, thunkAPI) => {
    try {
      await commentApis.getCommentList(data).then((res) => {
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
      });
    } catch (error) {
      console.log(error);
    }
  }
);

export const commentSlice = createSlice({
  // 액션명
  name: 'commentReducer',
  initialState: INITIAL_STATE,
  reducers: {
    addComment: (state, action: PayloadAction<AddCommentType>) => {
      const new_commentList = [
        ...state.list,
        {
          postsId: action.payload.postsId,
          commentsId: Math.random(),
          nickname: 'test1',
          content: action.payload.comment,
          createdAt: '2022-01-01 20:30',
          modifiedAt: '',
        },
      ];
      return { list: new_commentList };
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      const new_list = state.list.filter((comment) => {
        return comment.commentsId !== action.payload;
      });

      return { list: new_list };
    },
  },
});

export default commentSlice;

export const { addComment, deleteComment } = commentSlice.actions;

const commentActionCreators = {
  addCommentDB,
  getCommentListDB,
  deleteCommentDB,
};

export { commentActionCreators };
