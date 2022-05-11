import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface LikesState {
  like: {
    postsId: number;
    nickname: string;
    likesId: number;
  };
}

const INITIAL_STATE: LikesState = {
  like: {
    postsId: 1,
    nickname: '',
    likesId: 1,
  },
};
