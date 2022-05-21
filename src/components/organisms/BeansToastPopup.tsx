import { ToastPopupBox, DarkWrapper } from '../atoms';

interface BeansToastPopupProps {
  onClick: () => void;
}

const BeansToastPopup = (props: BeansToastPopupProps) => {
  return (
    <DarkWrapper onClick={props.onClick}>
      <ToastPopupBox>{/*  */}</ToastPopupBox>
    </DarkWrapper>
  );
};

export default BeansToastPopup;
