//import 'tailwindcss/tailwind.css';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import PostList from './pages/Post/PostList';
import PostDetail from './pages/Post/PostDetail';
import Login from './pages/Login';
import AddEditPost from './pages/Post/AddEditPost';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/login' element={<Login />} />
      <Route path='/posts' element={<PostList />} />
      <Route path='/posts/:postsId' element={<PostDetail />} />
      <Route path='/posts/write' element={<AddEditPost />} />
    </Routes>
  );
}

export default App;
