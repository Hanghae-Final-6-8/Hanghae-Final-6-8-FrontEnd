import { ToastPopupBox, DarkWrapper } from '../atoms';
import { useState } from 'react';

interface BeansToastPopupProps {
  onClick: () => void;
}

const BeansToastPopup = (props: BeansToastPopupProps) => {
  return (
    <DarkWrapper onClick={props.onClick}>
      <ToastPopupBox>hi</ToastPopupBox>
    </DarkWrapper>
  );
};

export default BeansToastPopup;
