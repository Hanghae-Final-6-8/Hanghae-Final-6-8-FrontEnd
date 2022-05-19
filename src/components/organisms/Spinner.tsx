import { spinnerBasic } from '../../assets/backgrounds';
import { GridBox } from '../atoms';

const Spinner = () => {
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
