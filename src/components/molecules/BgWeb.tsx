import { BgVideo } from '../atoms';
import { copickIcon, copick } from '../../assets/logo';
import { bean02, bean03, bean05, bean06, webBanner } from '../../assets/images';

const BgWeb = () => {
  return (
    <>
      <div className='absolute top-[90px] left-[110px] z-10 flex gap-5'>
        <img src={copickIcon} />
        <img src={copick} />
      </div>
      <div className='absolute top-1/2 -translate-y-[85%] z-10 flex gap-5 w-full'>
        <img className='w-full opacity-[.12]' src={copick} />
        <img
          className='absolute w-[6.5vw] right-[19.2%] -top-[18%]'
          src={bean02}
        />
        <img className='absolute w-[8vw] left-[26%] top-[42%]' src={bean03} />
        <img className='absolute w-[8vw] right-[28%] top-[60%]' src={bean05} />
        <img className='absolute w-[6.5vw] left-[16%] top-[1%]' src={bean06} />
      </div>
      <img
        className='absolute z-10 w-96 bottom-10 left-7 cursor-pointer 2xl:bottom-36 2xl:w-auto animate-moveHorizontal'
        src={webBanner}
      />
      <BgVideo />
    </>
  );
};

export default BgWeb;
