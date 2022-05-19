import { Routes, Route, Link } from 'react-router-dom';
import { MyFavorites } from '../../components/organisms';
import { MyLikes } from '../../components/organisms';
import { MyActivity } from '../../components/organisms';

const MypageTabs = () => {
  return (
    <div>
      <div className='tabs flex justify-around'>
        <div className='tab'>
          <Link to='favorites'>즐겨찾기</Link>
        </div>
        <div className='tab'>
          <Link to='likes'>좋아요</Link>
        </div>
        <div className='tab'>
          <Link to='activiry'>내활동</Link>
        </div>
      </div>
      <Routes>
        <Route path='favorites' element={<MyFavorites />} />
        <Route path='likes' element={<MyLikes />} />
        <Route path='activiry' element={<MyActivity />} />
      </Routes>
    </div>
  );
};

export default MypageTabs;
