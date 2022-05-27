import { useSelector } from 'react-redux';
import { spinnerBasic } from '../../assets/backgrounds';
import { RootState } from '../../redux/configureStore';
import { GridBox } from '../atoms';

const Spinner = () => {
  const { loading } = useSelector((state: RootState) => state.global);

  return (
    <>
      {loading ? (
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
      ) : null}
    </>
  );
};

export default Spinner;
