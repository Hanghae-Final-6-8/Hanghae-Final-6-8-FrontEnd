import {
  arrow,
  bean01,
  bean02,
  bean03,
  bean04,
  bean05,
} from '../../assets/images';
import { pickYour, coffee } from '../../assets/logo';

const BgWebFixed = () => {
  return (
    <>
      <div className='absolute z-10 -right-[26%] top-[72%]'>
        <img src={arrow} />
      </div>
      <div className='absolute z-10 -right-[103%] top-[85%]'>
        <img src={pickYour} />
        <img className='mt-5' src={coffee} />
      </div>
      <div className='absolute -top-[5%] -left-[15%]'>
        <img src={bean01} />
      </div>
      <div className='absolute top-[73%] -right-[20%]'>
        <img src={bean04} />
      </div>
    </>
  );
};

export default BgWebFixed;
