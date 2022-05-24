import { BgVideo } from '../atoms';
import { copickIcon, copick } from '../../assets/logo';

const BgWeb = () => {
  return (
    <>
      <div className='absolute top-[90px] left-[110px] z-10 flex gap-5'>
        <img src={copickIcon} />
        <img src={copick} />
      </div>
      <div className='absolute top-1/2 -translate-y-[85%] z-10 flex gap-5 w-full opacity-[.12]'>
        <img className=' w-full' src={copick} />
      </div>
      <BgVideo />
    </>
  );
};

//fixed z-10 w-[391px] h-[683px] right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 bg-slate-900 rounded-[38px] overflow-hidden

export default BgWeb;
