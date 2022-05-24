import { isMobile } from 'react-device-detect';
import BottomNav from '../components/BottomNav';
import bg from '../assets/backgrounds/beans_video.mp4';

interface Children {
  children: React.ReactNode;
}

function DeviceDetect({ children }: Children) {
  return isMobile ? (
    <div className='relative w-full h-full infinityScroll'>
      {children}
      <BottomNav />
    </div>
  ) : (
    <>
      <div className='w-screen h-screen bg-basicBg bg-center bg-cover bg-no-repeat bg-fixed'>
        <video muted autoPlay loop className='h-full object-cover'>
          <source src={bg} type='video/mp4' />
        </video>
        <div className='fixed w-[391px] h-[836px] right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 bg-slate-900 rounded-2xl overflow-hidden'>
          <div className='absoulte w-full h-full max-w-[375px] max-h-[812px]  translate-x-2 rounded-3xl overflow-hidden translate-y-3 bg-white'>
            <div className='absoulte w-full h-full rounded-3xl overflow-scroll no-scrollbar infinityScroll'>
              {children}
            </div>
            <BottomNav />
          </div>
        </div>
      </div>
    </>
  );
}

export default DeviceDetect;
