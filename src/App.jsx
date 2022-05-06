import 'tailwindcss/tailwind.css';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Community from './pages/Community';
import Login from './pages/Login';

// 임시
import AddCommunity from './pages/AddCommunity';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/login' element={<Login />} />
      <Route path='/community' element={<Community />} />
      <Route path='/community/write' element={<AddCommunity />} />
    </Routes>
  );
}

export default App;
