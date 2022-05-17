import { useForm } from 'react-hook-form';
import { Button, Text, Span, Label } from '../../components/atoms';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const TasteSurvey01 = () => {
  const navigate = useNavigate();

  const [selectAnswer, setSelectAnswer] = useState(0);

  const handleToNextPage = () => {
    if (selectAnswer === 0) {
      alert('답변을 선택해주세요!');
      return;
    }
    console.log(selectAnswer);
    navigate('../02', { state: { selectAnswer } });
  };

  return (
    <>
      <div className='flex flex-col'>
        <Text type='tasteNumber'>01</Text>
        <Text fw='500' fs='sub'>
          <Span fc='strong'>신 맛</Span>을 좋아하시나요?
        </Text>
        <div className='flex flex-col mt-10 gap-4'>
          <Label type='tasteAnswerSelect' htmlFor='yes'>
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
          <Label type='tasteAnswer' htmlFor='normal'>
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
          <Label type='tasteAnswer' htmlFor='no'>
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
            className='hidden translate-x-'
          />
        </div>
      </div>
      <Text type='tasteSurveyCaption'>앞으로 5문항이 남았어요!</Text>
      <Button type='tasteSurvey' onClick={handleToNextPage}>
        다음
      </Button>
    </>
  );
};

export default TasteSurvey01;
