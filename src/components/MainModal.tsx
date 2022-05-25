import { DarkWrapper, RoundBox } from './atoms';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button, Span, Text } from './atoms';
import { cross } from '../assets/icons';

const MainModal = () => {
  const navigate = useNavigate();
  const handleToTasteSurvey = () => {
    navigate('../survey/main');
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
          <RoundBox round='mainModal'>
            <button className=' absolute right-10'>
              <img
                className='w-8'
                style={{
                  filter:
                    'invert(64%) sepia(3%) saturate(20%) hue-rotate(14deg) brightness(102%) contrast(82%)',
                }}
                src={cross}
              />
            </button>
            <Text className='text-subH33 font-500'>
              자신의 원두 취향을 알아보고
              <br />
              <Span fc='strong'>Copick</Span> 을 시작해 주세요!
            </Text>
            <Text className='text-caption text-gray60 mt-2'>
              간단한 원두 취향 테스트를 통해 <br />
              자신에게 딱 맞는 원두를 알 수 있어요
            </Text>
            <Button
              className='text-white font-500 text-body'
              type='brownPType'
              onClick={handleToTasteSurvey}
            >
              원두 취향 테스트 하러가기
            </Button>
          </RoundBox>
        </DarkWrapper>
      ) : null}
    </>
  );
};

export default MainModal;
