import { useState } from 'react';
import { Button, DarkWrapper } from './atoms';
import { useNavigate } from 'react-router-dom';

const ToastPopup = () => {
  const navigate = useNavigate();
  const [isActivePopup, setIsActivePopup] = useState(false);

  const handleClosePopup = () => {
    setIsActivePopup(false);
  };
  const handleIsActivePopup = () => {
    setIsActivePopup(true);
  };
  const handleToLogin = () => {
    navigate('../');
  };

  return (
    <>
      {/* 로그인하면 로그인 유무에 따라 로직 수정 예정 */}
      <div
        className='absolute top-0 left-1/3 bg-amber-500'
        onClick={handleIsActivePopup}
      >
        toastPopup testBtn
      </div>
      {isActivePopup ? (
        <DarkWrapper onClick={handleClosePopup}>
          <div className='fixed z-20 w-full bottom-0 bg-white pb-84px px-30px rounded-t-40px pt-34px'>
            <div>
              <p>잠깐, 로그인 완료 후</p>
              <p>Copick을 이용해 주세요!</p>
              <p>
                간편 로그인을 통해 Copick 안에 있는 모든 서비스를 즐기실 수
                있어요
              </p>
            </div>
            <Button onClick={handleToLogin}>로그인하기</Button>
          </div>
        </DarkWrapper>
      ) : null}
    </>
  );
};

export default ToastPopup;
