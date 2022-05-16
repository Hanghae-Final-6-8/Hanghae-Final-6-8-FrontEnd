import { DarkWrapper, RoundBox } from './atoms';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button, Span, Text } from './atoms';

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
            <Text fs='subH33' fw='500'>
              자신의 원두 취향을 알아보고
              <br />
              <Span fc='strong'>Copick</Span> 을 시작해 주세요!
            </Text>
            <Text fs='caption' fw='400' fc='gray60' mt='8px'>
              간단한 원두 취향 테스트를 통해 <br />
              자신에게 딱 맞는 원두를 알 수 있어요
            </Text>
            <Button
              type='brownPType'
              fc='white'
              fw='500'
              fs='body'
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
