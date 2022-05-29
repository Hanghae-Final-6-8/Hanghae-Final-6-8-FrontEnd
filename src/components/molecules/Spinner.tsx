import { useSelector } from 'react-redux';
import { SpinnerBasic } from '../../assets/backgrounds';
import { RootState } from '../../redux/configureStore';
import { GridBox } from '../atoms';

const Spinner = () => {
  const { loading } = useSelector((state: RootState) => state.global);

  return (
    <>
      {loading ? (
        <GridBox
          className='fixed w-full h-full top-0 left-0 z-50 touch-none'
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
      ) : null}
    </>
  );
};

export default Spinner;
