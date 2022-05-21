import { Routes, Route } from 'react-router-dom';
import { Main } from './pages/Main';
import PostList from './pages/Post/PostList';
import PostDetail from './pages/Post/PostDetail';
import { Login, RedirectKakao } from './pages/LoginPage';
import AddEditPost from './pages/Post/AddEditPost';
import {
  BeansList,
  BeanDetail,
  BeansByCafe,
  BeansSearch,
} from './pages/BeansList';
import { Mypage } from './pages/MyPage';
import StoreLocation from './pages/Map/StoreLocation';
import {
  TasteSurvey,
  TasteSurveyMain,
  TasteSurvey01,
  TasteSurvey02,
  TasteSurvey03,
  TasteSurvey04,
  TasteSurvey05,
  TasteSurvey06,
  TasteSurveyLoading,
  TasteSurveyNeedLogin,
} from './pages/TasteSurvey';
import { NotFound } from './pages/System';
import { RootLayout } from './components/templates';

import { useEffect } from 'react';
import { useAppDispatch } from './redux/configureStore';
import { auth } from './redux/modules/user';
import { getAccessTokenFromCookie } from './utils/cookie';
import ScrollToTop from './utils/ScrollToTop';

function App() {
  const appDispatch = useAppDispatch();
  const isToken = getAccessTokenFromCookie();

  useEffect(() => {
    isToken && appDispatch(auth());
  }, [isToken, appDispatch]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path='/main' element={<Main />} />
        <Route path='/' element={<Login />} />
        <Route
          path='/api/user/login/kakao/callback/*'
          element={<RedirectKakao />}
        />

        <Route path='/map/:cafeName' element={<StoreLocation />} />
        <Route element={<RootLayout />}>
          <Route path='/posts' element={<PostList />} />
          <Route path='/posts/:postsId' element={<PostDetail />} />
          <Route path='/posts/write' element={<AddEditPost />} />
          <Route path='/posts/write/:postsId' element={<AddEditPost />} />
          <Route path='/mypage/*' element={<Mypage />} />
          <Route path='/survey' element={<TasteSurvey />}>
            <Route path='main' element={<TasteSurveyMain />} />
            <Route path='01' element={<TasteSurvey01 />} />
            <Route path='02' element={<TasteSurvey02 />} />
            <Route path='03' element={<TasteSurvey03 />} />
            <Route path='04' element={<TasteSurvey04 />} />
            <Route path='05' element={<TasteSurvey05 />} />
            <Route path='06' element={<TasteSurvey06 />} />
            <Route path='loading' element={<TasteSurveyLoading />} />
            <Route path='needlogin' element={<TasteSurveyNeedLogin />} />
          </Route>
          <Route path='/beans' element={<BeansList />}>
            <Route path=':beanId' element={<BeanDetail />} />
            <Route path='search' element={<BeansSearch />} />
            <Route path='cafe' element={<BeansByCafe />} />
          </Route>
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
