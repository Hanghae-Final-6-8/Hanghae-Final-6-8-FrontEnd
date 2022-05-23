import { configureStore, combineReducers } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import postsSlice from './modules/posts';
import commentSlice from './modules/comment';
import likesSlice from './modules/likes';
import { useDispatch } from 'react-redux';
import userSlice from './modules/user';
import tasteSlice from './modules/taste';
import mypageSlice from './modules/mypage';
import beansSlice from './modules/beans';
import cafeSlice from './modules/cafe';
import favoriteSlice from './modules/favorite';

const rootReducer = combineReducers({
  posts: postsSlice.reducer,
  comment: commentSlice.reducer,
  likes: likesSlice.reducer,
  user: userSlice.reducer,
  taste: tasteSlice.reducer,
  mypage: mypageSlice.reducer,
  beans: beansSlice.reducer,
  cafe: cafeSlice.reducer,
  favorite: favoriteSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
