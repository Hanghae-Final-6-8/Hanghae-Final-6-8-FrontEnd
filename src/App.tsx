//import 'tailwindcss/tailwind.css';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Posts from './pages/Posts';
import PostsDetail from './pages/PostsDetail';
import Login from './pages/Login';
import AddPosts from './pages/AddPosts';

function App() {
  return (
    <div className='relative h-full w-full'>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/posts/:postsId' element={<PostsDetail />} />
        <Route path='/posts/write' element={<AddPosts />} />
      </Routes>
    </div>
  );
}

export default App;
