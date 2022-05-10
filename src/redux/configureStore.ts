import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import { createLogger } from 'redux-logger';
import communitySlice from './modules/community';
import { useDispatch } from 'react-redux';

// const logger = createLogger();

const rootReducer = combineReducers({
  community: communitySlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;