import { Suspense, useEffect, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
// import { Main } from './pages/Main';
// import PostList from './pages/Post/PostList';
// import PostDetail from './pages/Post/PostDetail';
// import { Login, LoginRedirect } from './pages/LoginPage';
// import AddEditPost from './pages/Post/AddEditPost';
// import { BeansList, BeanDetail } from './pages/BeansList';
// import { Mypage } from './pages/MyPage';
// import StoreLocation from './pages/Map/StoreLocation';
import { Spinner } from './components/organisms';
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

import { useAppDispatch } from './redux/configureStore';
import { auth } from './redux/modules/user';
import { getAccessTokenFromCookie } from './utils/cookie';
import ScrollToTop from './utils/ScrollToTop';

const Main = lazy(() => import('./pages/Main/Main'));
const Login = lazy(() => import('./pages/LoginPage/Login'));
const LoginRedirect = lazy(() => import('./pages/LoginPage/LoginRedirect'));
const BeanDetail = lazy(() => import('./pages/BeansList/BeanDetail'));
const BeansList = lazy(() => import('./pages/BeansList/BeansList'));
const StoreLocation = lazy(() => import('./pages/Map/StoreLocation'));
const PostList = lazy(() => import('./pages/Post/PostList'));
const PostDetail = lazy(() => import('./pages/Post/PostDetail'));
const AddEditPost = lazy(() => import('./pages/Post/AddEditPost'));
const Mypage = lazy(() => import('./pages/MyPage/Mypage'));
const EditMyActivity = lazy(() => import('./pages/MyPage/EditMyActivity'));
const EditProfile = lazy(() => import('./pages/MyPage/EditProfile'));
const Privacy = lazy(() => import('./pages/System/Privacy'));

function App() {
  const appDispatch = useAppDispatch();
  const isToken = getAccessTokenFromCookie();

  useEffect(() => {
    isToken && appDispatch(auth());
  }, [isToken, appDispatch]);

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path='/main' element={<Main />} />
          <Route path='/main/privacy' element={<Privacy />} />
          <Route path='/' element={<Login />} />
          <Route path='/api/user/login/*' element={<LoginRedirect />} />
          <Route path='/beans/:beanId' element={<BeanDetail />} />

          <Route path='/map/:cafeName' element={<StoreLocation />} />
          <Route element={<RootLayout />}>
            <Route path='/posts' element={<PostList />} />
            <Route path='/posts/:postsId' element={<PostDetail />} />
            <Route path='/posts/write' element={<AddEditPost />} />
            <Route path='/posts/write/:postsId' element={<AddEditPost />} />
            <Route path='/mypage' element={<Mypage />} />
            <Route
              path='/mypage/activity/:tabNum'
              element={<EditMyActivity />}
            />
            <Route path='/mypage/profile' element={<EditProfile />} />
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
            <Route path='/beans' element={<BeansList />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
