import { SpinnerBasic } from '../../assets/backgrounds';
import { GridBox } from '../atoms';

const SpinnerSuspense = () => {
  return (
    <>
      <GridBox
        className='fixed top-0 left-0 w-full h-full z-50 touch-none'
        type='flexBasic'
      >
        <div className='bg-white absolute opacity-60 h-full w-full transition animate-fadeInZeroTo60'>
          {/*  */}
        </div>
        <div className='m-auto w-28 h-28 z-10 bg-brownS01bg rounded-full shadow-contents'>
          <div className='relative top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
            <SpinnerBasic />
          </div>
        </div>
      </GridBox>
    </>
  );
};

export default SpinnerSuspense;
