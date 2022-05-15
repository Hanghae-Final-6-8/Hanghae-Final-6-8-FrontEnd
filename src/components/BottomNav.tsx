import {
  navHome,
  navCoffee,
  navCommunity,
  navUser,
} from '../assets/icons/index';
import { useNavigate } from 'react-router-dom';
import ToastPopup from './ToastPopup';

const BottomNav = () => {
  const navigate = useNavigate();

  const handleToMain = () => {
    navigate('./main');
  };
  const handleToBeansList = () => {
    navigate('./beans');
  };

  const handleToMypage = () => {
    navigate('./mypage');
  };
  const handleToPostList = () => {
    navigate('./posts');
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
    location.pathname === '/survey/loading'
  ) {
    return null;
  }
  return (
    <>
      <ToastPopup />
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
        <button className='flex-auto fill-slate-200' onClick={handleToMypage}>
          <img className='mx-auto w-30px -translate-y-7px' src={navUser} />
        </button>
      </nav>
    </>
  );
};

export default BottomNav;
