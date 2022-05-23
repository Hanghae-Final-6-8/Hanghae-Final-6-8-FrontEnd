import { useEffect } from 'react';
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

  return (
    <DarkWrapper onClick={props.onClick}>
      <ToastPopupBox className='h-96' type='default'>
        <div className='flex justify-between mb-30px'>
          <Text className='font-500 text-sub'>
            <Span type='strong'>찾으시는 카페</Span>를 선택해주세요!
          </Text>
          <img src={check} />
        </div>

        <div className='h-[800px] flex flex-col'>
          {cafeListFormdata.map((item) => (
            <Button
              type='selectBtn'
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
