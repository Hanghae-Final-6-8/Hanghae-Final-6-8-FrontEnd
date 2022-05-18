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

  const [selectAnswer, setSelectAnswer] = useState(0);
  // checkbox로 상태 관리를 위한 useState
  const [isChecked, setIsChecked] = useState(false);
  const [checkedFlavor, setCheckedFlavor] = useState(new Set());

  // 동적 class 변경을 위한 useState
  const [isCheckedRadio, setIsCheckedRadio] = useState(false);
  const [isCheckedAll, setIsCheckedAll] = useState(false);

  const [clickFruits, setClickFruits] = useState(false);
  const [clickChocolate, setClickChocolate] = useState(false);
  const [clickPenuts, setClickPenuts] = useState(false);
  const [clickFlower, setClickFlower] = useState(false);

  const [isBtnActive, setIsBtnActive] = useState(false);

  const handleToNextPage = () => {
    if (selectAnswer === 0 && [...checkedFlavor].length === 0) {
      alert('답변을 선택해주세요!');
      return;
    }

    let flavorList = {
      floral: 0,
      fruit_flavor: 0,
      cocoa_flavor: 0,
      nutty_flavor: 0,
    };
    if (selectAnswer === 1) {
      Object.assign(tasteList as object, flavorList);
    } else if (selectAnswer === 2) {
      flavorList = {
        floral: 1,
        fruit_flavor: 1,
        cocoa_flavor: 1,
        nutty_flavor: 1,
      };
    } else {
      const setFlavorList = [...checkedFlavor].reduce((acc: any, cur: any) => {
        acc[cur] = (acc[cur] || 0) + 1;
        return acc;
      }, {});
      Object.assign(flavorList, setFlavorList);
      Object.assign(tasteList as object, flavorList);
    }

    if (user.isLogin) {
      navigate('../loading', {
        state: { ...(tasteList as object) },
      });
    } else {
      navigate('../needlogin', {
        state: { ...(tasteList as object) },
      });
    }
  };

  const formData = [
    {
      id: 1,
      name: 'fruit_flavor',
      korean: '과일 향',
      img: fruits,
      bool: clickFruits,
    },
    {
      id: 2,
      name: 'cocoa_flavor',
      korean: '코코아 향',
      img: chocolate,
      bool: clickChocolate,
    },
    {
      id: 3,
      name: 'nutty_flavor',
      korean: '견과류 향',
      img: penuts,
      bool: clickPenuts,
    },
    { id: 4, name: 'floral', korean: '꽃 향', img: flower, bool: clickFlower },
  ];

  const handleChangeColor = () => {
    const checkedList = [...checkedFlavor];
    //console.log(checkedList);
    if (checkedList.includes('fruit_flavor')) {
      setClickFruits(true);
    } else {
      setClickFruits(false);
    }

    if (checkedList.includes('cocoa_flavor')) {
      setClickChocolate(true);
    } else {
      setClickChocolate(false);
    }

    if (checkedList.includes('nutty_flavor')) {
      setClickPenuts(true);
    } else {
      setClickPenuts(false);
    }

    if (checkedList.includes('floral')) {
      setClickFlower(true);
    } else {
      setClickFlower(false);
    }
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked);
    setIsCheckedRadio(false);
    setSelectAnswer(0);
    handleClickCheckBox(e.target.value, e.target.checked);
  };

  const handleClickCheckBox = (id: string, isChecked: boolean) => {
    if (isChecked) {
      checkedFlavor.add(id);
      setCheckedFlavor(checkedFlavor);
    } else if (!isChecked && checkedFlavor.has(id)) {
      checkedFlavor.delete(id);
      setCheckedFlavor(checkedFlavor);
    }
    setIsBtnActive(true);
    handleChangeColor();
    return checkedFlavor;
  };

  const handleClickRadio = () => {
    setClickFruits(false);
    setClickChocolate(false);
    setClickPenuts(false);
    setClickFlower(false);
    setIsChecked(false);

    checkedFlavor.clear();
  };

  //console.log(isBtnActive);

  return (
    <>
      <GridBox type='flexBasic'>
        <Text type='tasteNumber'>06</Text>
        <Text className='font-500 text-sub'>
          <Span fc='strong'>특별한 향</Span>을 좋아하시나요?
        </Text>
        <Text type='tasteCaption'>복수선택 가능</Text>
        <GridBox type='flexTasteSurvey06'>
          {formData.map((item) => (
            <Label
              bool={item.bool}
              htmlFor={item.name}
              img={item.img}
              key={item.id}
            >
              {item.korean}
              <input
                id={item.name}
                type='checkbox'
                value={item.name}
                onChange={handleCheck}
                //checked={isCheckedAll}
                className='hidden'
              />
            </Label>
          ))}
        </GridBox>
        <Hr type='taste327' />
        <Text type='tasteCaption'>단일선택 가능</Text>
        <GridBox type='flexTasteSurvey06'>
          <Label
            type={
              2 === selectAnswer ? 'flavorAnswerSecSelect' : 'flavorAnswerSec'
            }
            htmlFor='everything'
          >
            상관없음
          </Label>
          <input
            id='everything'
            name='answer'
            type='radio'
            value='1'
            checked={isCheckedRadio}
            onChange={() => {
              handleClickRadio(), setSelectAnswer(2);
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
            checked={isCheckedRadio}
            onChange={() => {
              handleClickRadio(), setSelectAnswer(1);
            }}
            className='hidden'
          />
        </GridBox>
      </GridBox>
      <Text type='tasteSurveyCaption'>드디어 마지막 문항이에요!</Text>
      <Button
        type={
          selectAnswer !== 0 || isBtnActive
            ? 'tasteSurvey'
            : 'tasteSurveyNoneActive'
        }
        onClick={handleToNextPage}
      >
        테스트 결과 확인하기
      </Button>
    </>
  );
};

export default TasteSurvey06;
