import { Button, Text, Span, Label, GridBox, Hr } from '../../components/atoms';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configureStore';
import { flower, fruits, chocolate, penuts } from '../../assets/icons';

const TasteSurvey06 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tasteList = location.state;
  const user = useSelector((state: RootState) => state.user);
  console.log(user.isLogin);
  console.log(tasteList);

  const [selectAnswer, setSelectAnswer] = useState(0);

  const handleToNextPage = () => {
    if (selectAnswer === 0) {
      alert('답변을 선택해주세요!');
      return;
    }
    if (user.isLogin) {
      navigate('../loading', {
        state: { ...(tasteList as object), floral: selectAnswer },
      });
    } else {
      navigate('../needlogin', {
        state: { ...(tasteList as object), floral: selectAnswer },
      });
    }
  };

  return (
    <>
      <GridBox type='flexBasic'>
        <Text type='tasteNumber'>06</Text>
        <Text fw='500' fs='sub'>
          <Span fc='strong'>특별한 향</Span>을 좋아하시나요?
        </Text>
        <Text type='tasteCaption'>복수선택 가능</Text>
        <GridBox type='flexTasteSurvey06'>
          <Label
            type={3 === selectAnswer ? 'flavorAnswerSelect' : 'flavorAnswer'}
            htmlFor='yes'
            img={fruits}
          >
            과일향
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
            type={2 === selectAnswer ? 'flavorAnswerSelect' : 'flavorAnswer'}
            htmlFor='normal'
            img={chocolate}
          >
            코코아 향
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
            type={1 === selectAnswer ? 'flavorAnswerSelect' : 'flavorAnswer'}
            htmlFor='no'
            img={penuts}
          >
            견과류 향
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
          <Label
            type={1 === selectAnswer ? 'flavorAnswerSelect' : 'flavorAnswer'}
            htmlFor='no'
            img={flower}
          >
            꽃 향
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
        <Hr type='taste327' />
        <Text type='tasteCaption'>단일선택 가능</Text>
        <GridBox type='flexTasteSurvey06'>
          <Label
            type={
              1 === selectAnswer ? 'flavorAnswerSecSelect' : 'flavorAnswerSec'
            }
            htmlFor='no'
          >
            상관없음
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
          <Label
            type={
              1 === selectAnswer ? 'flavorAnswerSecSelect' : 'flavorAnswerSec'
            }
            htmlFor='no'
          >
            좋아하지 않음
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
      <Text type='tasteSurveyCaption'>드디어 마지막 문항이에요!</Text>
      <Button
        type={selectAnswer === 0 ? 'tasteSurveyNoneActive' : 'tasteSurvey'}
        onClick={handleToNextPage}
      >
        테스트 결과 확인하기
      </Button>
    </>
  );
};

export default TasteSurvey06;
