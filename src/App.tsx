//import 'tailwindcss/tailwind.css';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Posts from './pages/Posts';
import PostsDetail from './pages/PostsDetail';
import Login from './pages/Login';
import AddPosts from './pages/AddPosts';
import BeansList from './pages/BeansList/BeansList';
import TasteSurvey from './pages/TasteSurvey/TasteSurvey';
import Mypage from './pages/MyPage/Mypage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/login' element={<Login />} />
      <Route path='/posts' element={<Posts />} />
      <Route path='/posts/:postsId' element={<PostsDetail />} />
      <Route path='/posts/write' element={<AddPosts />} />
      <Route path='/mypage' element={<Mypage />} />
      <Route path='/survey' element={<TasteSurvey />} />
      <Route path='/beans' element={<BeansList />} />
    </Routes>
  );
}

export default App;
