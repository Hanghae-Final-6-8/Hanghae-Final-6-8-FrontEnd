import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CommentItemDataParams {
  postsId: number;
  commentsId: number;
  nickname: string;
  content: string;
  createdAt: string;
  modifiedAt: string;
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

export const { addComment } = commentSlice.actions;

export default commentSlice;
