import { useState } from 'react';
import { mobileBanner } from '../../assets/images';
const MobileBanner = () => {
  const [isShow, setIsShow] = useState<boolean>(true);
  const handleToHide = () => {
    setIsShow(false);
  };
  return (
    <>
      {isShow ? (
        <img
          className='absolute z-50 top-1/2 -translate-y-1/2 h-[95%] left-1/2 -translate-x-1/2 cursor-pointer'
          onClick={handleToHide}
          src={mobileBanner}
        />
      ) : null}
    </>
  );
};

export default MobileBanner;
