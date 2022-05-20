import { useState } from 'react';
import {
  navHome,
  navCoffee,
  navCommunity,
  navUser,
} from '../assets/icons/index';
import { useNavigate } from 'react-router-dom';
import ToastPopup from './ToastPopup';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/configureStore';

const BottomNav = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  console.log(user);

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
    location.pathname === '/survey/main' ||
    location.pathname === '/survey/01' ||
    location.pathname === '/survey/02' ||
    location.pathname === '/survey/03' ||
    location.pathname === '/survey/04' ||
    location.pathname === '/survey/05' ||
    location.pathname === '/survey/06' ||
    location.pathname === '/survey/needlogin' ||
    location.pathname === '/survey/loading' ||
    location.pathname === '/app/user/login/kakao/callback'
  ) {
    return null;
  }
  return (
    <>
      {isActivePopup ? <ToastPopup onClick={handleClosePopup} /> : null}
      <nav className='fixed flex bottom-0 z-30 bg-slate-50 w-full h-84px shadow-toolbar'>
        <button className='flex-auto fill-slate-200' onClick={handleToMain}>
          <img className='mx-auto w-30px -translate-y-7px' src={navHome} />
        </button>
        <button
          className='flex-auto fill-slate-200'
          onClick={handleToBeansList}
        >
          <img className='mx-auto w-30px -translate-y-7px' src={navCoffee} />
        </button>
        <button className='flex-auto fill-slate-200' onClick={handleToPostList}>
          <img className='mx-auto w-30px -translate-y-7px' src={navCommunity} />
        </button>
        <button
          className='flex-auto fill-slate-200'
          onClick={user.isLogin ? handleToMypage : handleIsActivePopup}
        >
          <img className='mx-auto w-30px -translate-y-7px' src={navUser} />
        </button>
      </nav>
    </>
  );
};

export default BottomNav;
