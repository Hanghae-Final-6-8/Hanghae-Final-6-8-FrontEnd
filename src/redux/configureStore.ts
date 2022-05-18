import { configureStore, combineReducers } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import postsSlice from './modules/posts';
import commentSlice from './modules/comment';
import likesSlice from './modules/likes';
import imageSlice from './modules/image';
import { useDispatch } from 'react-redux';
import userSlice from './modules/user';

const rootReducer = combineReducers({
  posts: postsSlice.reducer,
  comment: commentSlice.reducer,
  likes: likesSlice.reducer,
  image: imageSlice.reducer,
  user: userSlice.reducer,
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
