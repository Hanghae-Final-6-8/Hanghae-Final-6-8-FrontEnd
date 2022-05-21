import { up, down } from '../../assets/icons';
import { BeansToastPopup } from '../../components/organisms';
import { useState } from 'react';

const BeansCafeBtn = () => {
  const [isActivePopup, setIsActivePopup] = useState(false);
  const handleClosePopup = () => {
    setIsActivePopup(false);
  };
  const handleIsActivePopup = () => {
    setIsActivePopup(true);
  };
  return (
    <>
      <button
        placeholder='모든 카페 보기'
        className='relative w-full bg-brownP h-[43px] bg-transparent text-white placeholder-inherit rounded-full px-5 text-left'
        onClick={handleIsActivePopup}
      >
        모든 카페 보기
        <div className='absolute right-4 top-2'>
          <img
            style={{
              filter:
                'invert(94%) sepia(100%) saturate(0%) hue-rotate(240deg) brightness(108%) contrast(101%)',
            }}
            src={down}
          />
        </div>
      </button>

      {isActivePopup ? <BeansToastPopup onClick={handleClosePopup} /> : null}
    </>
  );
};

export default BeansCafeBtn;
