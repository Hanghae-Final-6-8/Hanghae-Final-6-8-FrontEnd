import { Button, Text, Span, Label, GridBox } from '../../components/atoms';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const TasteSurvey03 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tasteList = location.state;

  const [selectAnswer, setSelectAnswer] = useState(0);

  const handleToNextPage = () => {
    if (selectAnswer === 0) {
      alert('답변을 선택해주세요!');
      return;
    }
    navigate('../04', {
      state: { ...(tasteList as object), sweetness: selectAnswer },
    });
  };

  return (
    <>
      <GridBox type='flexBasic'>
        <Text type='tasteNumber'>03</Text>
        <Text className='font-500 text-sub'>
          <Span fc='strong'>단 맛</Span>을 좋아하시나요?
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
      <Text type='tasteSurveyCaption'>앞으로 3문항이 남았어요!</Text>
      <Button
        type={selectAnswer === 0 ? 'tasteSurveyNoneActive' : 'tasteSurvey'}
        onClick={handleToNextPage}
      >
        다음
      </Button>
    </>
  );
};

export default TasteSurvey03;
