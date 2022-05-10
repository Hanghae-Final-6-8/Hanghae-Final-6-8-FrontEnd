import {
  navHome,
  navCoffee,
  navCommunity,
  navUser,
} from '../assets/icons/index';

const BottomNav = () => {
  return (
    <nav className='absolute flex bottom-0 bg-slate-50 w-full h-84'>
      <button className='flex-auto fill-slate-200'>
        <img className='mx-auto w-30 -translate-y-7px' src={navHome} />
      </button>
      <button className='flex-auto fill-slate-200'>
        <img className='mx-auto w-30 -translate-y-7px' src={navCoffee} />
      </button>
      <button className='flex-auto fill-slate-200'>
        <img className='mx-auto w-30 -translate-y-7px' src={navCommunity} />
      </button>
      <button className='flex-auto fill-slate-200'>
        <img className='mx-auto w-30 -translate-y-7px' src={navUser} />
      </button>
    </nav>
  );
};

export default BottomNav;
