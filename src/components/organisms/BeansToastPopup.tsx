import { useEffect, useState } from 'react';
import { check } from '../../assets/icons';
import { RootState, useAppDispatch } from '../../redux/configureStore';
import { getBeansListByCafe, getCafeList } from '../../redux/modules/cafe';
import { ToastPopupBox, DarkWrapper, Text, Span, Button } from '../atoms';
import { useSelector } from 'react-redux';

interface BeansToastPopupProps {
  onClick: () => void;
}

const BeansToastPopup = (props: BeansToastPopupProps) => {
  const appDispatch = useAppDispatch();
  const cafe = useSelector((state: RootState) => state.cafe);
  const [isSelectedBtn, setIsSelectedBtn] = useState(0);
  useEffect(() => {
    !cafe.isLoaded && appDispatch(getCafeList());
  }, []);

  //console.log(cafe);

  const cafeListFormdata: { cafeId: number; cafeName: string }[] = [];
  cafe.cafeList.forEach((el) => {
    cafeListFormdata.push(el);
  });

  const handleGetBeansListByCafe = (e: {
    currentTarget: { getAttribute: (arg0: string) => void };
  }) => {
    const currentTargetValue = Number(
      e.currentTarget.getAttribute('data-cafeid')
    );
    appDispatch(getBeansListByCafe(currentTargetValue));
  };

  // const handleIsSelectedBtn = (e: {
  //   currentTarget: { getAttribute: (arg0: string) => void };
  // }) => {
  //   const currentTargetValue = Number(
  //     e.currentTarget.getAttribute('data-cafeid')
  //   );
  //   setIsSelectedBtn(currentTargetValue);
  // };

  return (
    <DarkWrapper onClick={props.onClick}>
      <ToastPopupBox className='h-96' type='scrollBox'>
        <div className='flex justify-between px-30px mb-1'>
          <Text className='font-500 text-sub'>
            <Span type='strong'>찾으시는 카페</Span>를 선택해주세요!
          </Text>
          <img src={check} />
        </div>

        <div className='h-full pt-6 px-30px pb-14 overflow-y-auto no-scrollbar'>
          {cafeListFormdata.map((item) => (
            <Button
              type={
                isSelectedBtn === item.cafeId ? 'clickedSelectBtn' : 'selectBtn'
              }
              key={item.cafeId}
              onClick={handleGetBeansListByCafe}
              data={item.cafeId}
            >
              {item.cafeName}
            </Button>
          ))}
        </div>
      </ToastPopupBox>
    </DarkWrapper>
  );
};

export default BeansToastPopup;
