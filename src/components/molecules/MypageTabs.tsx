import { Link, Outlet } from 'react-router-dom';

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
      <Outlet />
    </div>
  );
};

export default MypageTabs;
