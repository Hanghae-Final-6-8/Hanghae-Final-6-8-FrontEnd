import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';

export interface LikesItemDataParams {
  postsId: number;
  nickname: string;
  likesId: number;
}

export interface LikesState {
  list: Array<LikesItemDataParams>;
}

interface AddLikesType {
  postsId: number;
  nickname: string;
}

const INITIAL_STATE: LikesState = {
  list: [
    // {
    //   postsId: 1,
    //   nickname: 'test2',
    //   likesId: 1,
    // },
  ],
};

export const likesSlice = createSlice({
  name: 'likesReducer',
  initialState: INITIAL_STATE,
  reducers: {
    addLikes: (state, action: PayloadAction<AddLikesType>) => {
      const new_likesList = [
        ...state.list,
        {
          likesId: Math.random(),
          postsId: action.payload.postsId,
          nickname: action.payload.nickname,
        },
      ];
      return { list: new_likesList };
    },
    deleteLikes: (state: LikesState, action: PayloadAction<number>) => {
      const new_likesList = state.list.filter((like) => {
        return like.likesId !== action.payload;
      });
      return { list: new_likesList };
    },
  },
});

// export const { addLikes } = likesSlice.actions;

export default likesSlice;
