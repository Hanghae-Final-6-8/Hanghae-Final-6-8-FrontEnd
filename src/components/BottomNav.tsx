import { useState } from 'react';
import {
  navHome,
  navCoffee,
  navCommunity,
  navUser,
} from '../assets/icons/index';
import { useNavigate, useLocation } from 'react-router-dom';
import { NeedLoginToastPopup } from './molecules';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/configureStore';
import { Icon } from './atoms';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user);
  const currentLocation = location.pathname.split('/')[1];

  const [isActivePopup, setIsActivePopup] = useState(false);

  const handleClosePopup = () => {
    setIsActivePopup(false);
  };
  const handleIsActivePopup = () => {
    setIsActivePopup(true);
  };

  const handleToMain = () => {
    navigate('./main');
    handleClosePopup();
  };
  const handleToBeansList = () => {
    navigate('./beans');
    handleClosePopup();
  };

  const handleToPostList = () => {
    navigate('./posts');
    handleClosePopup();
  };
  const handleToMypage = () => {
    navigate('./mypage');
  };
  // 특정 페이지에서 navibar 안보이게 하는 기능, 추후 refactoring 필요
  if (
    location.pathname === '/' ||
    location.pathname === '/map' ||
    currentLocation === 'survey' ||
    location.pathname === '/app/user/login/kakao/callback'
  ) {
    return null;
  }
  return (
    <>
      {isActivePopup ? (
        <NeedLoginToastPopup onClick={handleClosePopup} />
      ) : null}
      <nav className='fixed flex bottom-0 z-30 bg-slate-50 w-full h-84px shadow-toolbar'>
        <button className='flex-auto fill-slate-200' onClick={handleToMain}>
          <Icon
            isClicked={currentLocation === 'main'}
            type='bottomNav'
            src={navHome}
          />
        </button>
        <button
          className='flex-auto fill-slate-200'
          onClick={handleToBeansList}
        >
          <Icon
            isClicked={currentLocation === 'beans'}
            type='bottomNav'
            src={navCoffee}
          />
        </button>
        <button className='flex-auto fill-slate-200' onClick={handleToPostList}>
          <Icon
            isClicked={currentLocation === 'posts'}
            type='bottomNav'
            src={navCommunity}
          />
        </button>
        <button
          className='flex-auto fill-slate-200'
          onClick={user.isLogin ? handleToMypage : handleIsActivePopup}
        >
          <Icon
            isClicked={currentLocation === 'mypage'}
            type='bottomNav'
            src={navUser}
          />
        </button>
      </nav>
    </>
  );
};

export default BottomNav;
