import { useEffect, useState } from 'react';
import { mobileBanner } from '../../assets/images';

const MobileBanner = () => {
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(() => {
    const closeAt = Number(localStorage.getItem('closePopup'))!;
    const whenWillBeExpired = closeAt + 1000 * 60 * 60 * 24;

    const currentTime = Math.floor(new Date().getTime());

    // 처음 들어오면 팝업을 띄움
    if (Number.isNaN(closeAt)) {
      setIsShow(true);
    }

    // 제한 시간을 지났으므로 팝업을 띄움
    if (whenWillBeExpired < currentTime) {
      setIsShow(true);
    }
  }, []);

  const handleToHide = () => {
    setIsShow(false);
    const currentTime = String(new Date().getTime());

    localStorage.setItem('closePopup', currentTime);
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
