//import 'tailwindcss/tailwind.css';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import PostList from './pages/Post/PostList';
import PostDetail from './pages/Post/PostDetail';
import Login from './pages/Login';
import AddEditPost from './pages/Post/AddEditPost';
import BeansList from './pages/BeansList/BeansList';
import TasteSurvey from './pages/TasteSurvey/TasteSurvey';
import Mypage from './pages/MyPage/Mypage';
import StoreLocation from './pages/Map/StoreLocation';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/main' element={<Main />} />
      <Route path='/posts' element={<PostList />} />
      <Route path='/posts/:postsId' element={<PostDetail />} />
      <Route path='/posts/write' element={<AddEditPost />} />
      <Route path='/posts/write/:postsId' element={<AddEditPost />} />
      <Route path='/map' element={<StoreLocation />} />
      <Route path='/mypage' element={<Mypage />} />
      <Route path='/survey' element={<TasteSurvey />} />
      <Route path='/beans' element={<BeansList />} />
    </Routes>
  );
}

export default App;
