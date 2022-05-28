import { Button, Text, Span, Label, GridBox } from '../../components/atoms';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TasteToastPopup } from '../../components/molecules';

const TasteSurvey02 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tasteList = location.state;

  const [selectAnswer, setSelectAnswer] = useState(0);

  const handleToNextPage = () => {
    if (selectAnswer === 0) {
      alert('답변을 선택해주세요!');
      return;
    }
    navigate('../03', {
      state: { ...(tasteList as object), body: selectAnswer },
    });
  };

  const [isActivePopup, setIsActivePopup] = useState(false);
  const handleClosePopup = () => {
    setIsActivePopup(false);
  };
  const handleIsActivePopup = () => {
    setIsActivePopup(true);
  };

  return (
    <>
      <GridBox type='flexBasic'>
        <Text type='tasteNumber'>02</Text>
        <Text className='font-500 text-sub'>
          <Span fc='strong'>바디감</Span>이 있는 것을 좋아하시나요?
        </Text>
        <Text
          type='tasteCaption'
          className='underline underline-offset-1 cursor-pointer'
          onClick={handleIsActivePopup}
        >
          바디감이 뭐예요?
        </Text>
        <GridBox type='flexTasteSurvey'>
          <Label
            type={3 === selectAnswer ? 'tasteAnswerSelect' : 'tasteAnswer'}
            htmlFor='yes'
          >
            네, 좋아해요!
          </Label>
          <input
            id='yes'
            name='answer'
            type='radio'
            value='3'
            onChange={() => {
              setSelectAnswer(3);
            }}
            className='hidden'
          />
          <Label
            type={2 === selectAnswer ? 'tasteAnswerSelect' : 'tasteAnswer'}
            htmlFor='normal'
          >
            음..보통이에요
          </Label>
          <input
            id='normal'
            name='answer'
            type='radio'
            value='2'
            onChange={() => {
              setSelectAnswer(2);
            }}
            className='hidden'
          />
          <Label
            type={1 === selectAnswer ? 'tasteAnswerSelect' : 'tasteAnswer'}
            htmlFor='no'
          >
            아니요. 안 좋아해요
          </Label>
          <input
            id='no'
            name='answer'
            type='radio'
            value='1'
            onChange={() => {
              setSelectAnswer(1);
            }}
            className='hidden'
          />
        </GridBox>
      </GridBox>

      <Text type='tasteSurveyCaption'>앞으로 4문항이 남았어요!</Text>
      <Button
        type={selectAnswer === 0 ? 'tasteSurveyNoneActive' : 'tasteSurvey'}
        onClick={handleToNextPage}
      >
        다음
      </Button>
      {isActivePopup ? <TasteToastPopup onClick={handleClosePopup} /> : null}
    </>
  );
};

export default TasteSurvey02;
