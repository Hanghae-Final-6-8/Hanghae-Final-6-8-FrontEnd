import { DarkWrapper, ToastPopupBox, Text, Button, Span } from '../atoms';

interface TasteToastPopupProps {
  onClick: () => void;
}

const TasteToastPopup = (props: TasteToastPopupProps) => {
  return (
    <DarkWrapper onClick={props.onClick}>
      <ToastPopupBox className='pb-26px animate-scrollUp' type='default'>
        <Text type='head'>
          <Span type='strong'>바디감</Span>이란?
        </Text>
        <Text className='mt-2 text-gray80 text-body'>
          주로 와인이나 위스키, 커피 따위를 감별할 때 입 안에서 느껴지는 느낌.
          또는 입 안에서의 느낌이 무겁거나 묵직한 상태를 말해요!
        </Text>
        <Button type='toastPopup'>닫기</Button>
      </ToastPopupBox>
    </DarkWrapper>
  );
};

export default TasteToastPopup;
