import { isMobile } from 'react-device-detect';
import { BgWeb } from '../components/molecules';
import BottomNav from '../components/BottomNav';

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
      <div className='w-screen h-screen bg-gray90 bg-center bg-cover bg-no-repeat bg-fixed'>
        <BgWeb />
        <div className='fixed z-10 w-[391px] h-[683px] right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 bg-slate-900 rounded-[38px] '>
          {/* <div className='text-white absolute z-30'>hi</div> */}
          <div className='absoulte w-full h-full max-w-[375px] max-h-[667px]  translate-x-2 rounded-[30px] overflow-hidden translate-y-2 bg-white'>
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
