import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
// 댓글 조회
export const axiosGetCommentList = createAsyncThunk(
  'commentReducer/axiosGetCommentList',
  async (data: number, thunkAPI) => {
    return await axios
      .get(`http://110.46.158.168:8090/api/comments?posts_id=${data}`)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);

interface addCommentType {
  postsId: number;
  comment: string;
}
// 댓글 등록
export const axiosAddComment = createAsyncThunk(
  'commentReducer/axiosAddComment',
  async (data: addCommentType, thunkAPI) => {
    const commentData = {
      content: data.comment,
      posts_id: data.postsId,
    };
    return await axios({
      url: 'http://110.46.158.168:8090/api/comments',
      method: 'POST',
      data: commentData,
    })
      .then((res) => {
        console.log(res);
        thunkAPI.dispatch(addComment(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
// 댓글 삭제
export const axiosDeleteComment = createAsyncThunk(
  'commentReducer/axiosDeleteComment',
  async (data: number, thunkAPI) => {
    return await axios({
      url: 'http://110.46.158.168:8090/api/comments/delete',
      method: 'POST',
      data: data,
    })
      .then((res) => {
        console.log(res);
        thunkAPI.dispatch(deleteComment(data));
      })
      .catch((error) => {
        console.log(error);
      });
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
  axiosAddComment,
  axiosGetCommentList,
  axiosDeleteComment,
};

export { commentActionCreators };
