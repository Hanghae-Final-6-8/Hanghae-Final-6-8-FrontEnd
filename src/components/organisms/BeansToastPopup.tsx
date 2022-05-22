import { check } from '../../assets/icons';
import { ToastPopupBox, DarkWrapper, Text, Span, Button } from '../atoms';

interface BeansToastPopupProps {
  onClick: () => void;
}

const BeansToastPopup = (props: BeansToastPopupProps) => {
  const cafeListFormdata = [
    { cafe_id: 1, cafe_name: '스타벅스' },
    { cafe_id: 2, cafe_name: '투썸플레이스' },
    { cafe_id: 3, cafe_name: '탐앤탐스' },
    { cafe_id: 4, cafe_name: '엔제리너스' },
  ];

  return (
    <DarkWrapper onClick={props.onClick}>
      <ToastPopupBox type='default'>
        <div className='flex justify-between mb-30px'>
          <Text className='font-500 text-sub'>
            <Span type='strong'>찾으시는 카페</Span>를 선택해주세요!
          </Text>
          <img src={check} />
        </div>
        {cafeListFormdata.map((item) => (
          <Button type='selectBtn' key={item.cafe_id}>
            {item.cafe_name}
          </Button>
        ))}
      </ToastPopupBox>
    </DarkWrapper>
  );
};

export default BeansToastPopup;
