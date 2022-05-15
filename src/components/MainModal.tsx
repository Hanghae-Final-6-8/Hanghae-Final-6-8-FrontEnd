import { DarkWrapper } from './atoms';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from './atoms';

const MainModal = () => {
  const navigate = useNavigate();
  const handleToTasteSurvey = () => {
    navigate('../survey');
  };

  const [isActivePopup, setIsActivePopup] = useState(true);

  const handleClosePopup = () => {
    setIsActivePopup(false);
  };
  const handleIsActivePopup = () => {
    setIsActivePopup(true);
  };

  return (
    <>
      {isActivePopup ? (
        <DarkWrapper data='mainModal' onClick={handleClosePopup}>
          <div className='bg-white mt-52 px-30px py-34px rounded-36px'>
            자신의 원두 취향을 알아보고 Copick 을 시작해 주세요!
            <Button onClick={handleToTasteSurvey}>
              원두 취향 테스트 하러가기
            </Button>
          </div>
        </DarkWrapper>
      ) : null}
    </>
  );
};

export default MainModal;
