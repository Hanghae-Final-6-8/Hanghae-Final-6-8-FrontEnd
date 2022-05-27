import { useSelector } from 'react-redux';
import { spinnerBasic } from '../../assets/backgrounds';
import { RootState } from '../../redux/configureStore';
import { GridBox } from '../atoms';

const Spinner = () => {
  const global = useSelector((state: RootState) => state.global);
  return (
    <>
      <GridBox className='h-full' type='flexBasic'>
        <div className='m-auto'>
          <img src={spinnerBasic} />
        </div>
      </GridBox>
    </>
  );
};

export default Spinner;
