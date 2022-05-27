import { spinnerBasic } from '../../assets/backgrounds';
import { GridBox } from '../atoms';

const SpinnerSuspense = () => {
  return (
    <>
      <GridBox
        className='fixed w-full  h-full z-50 touch-none'
        type='flexBasic'
      >
        <div className='bg-white absolute opacity-60 h-full w-full'>
          {/*  */}
        </div>
        <div className='m-auto z-10 bg-brownS01bg rounded-full shadow-contents'>
          <img className='w-24' src={spinnerBasic} />
        </div>
      </GridBox>
    </>
  );
};

export default SpinnerSuspense;
