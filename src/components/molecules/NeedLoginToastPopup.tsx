import { Text, ToastPopupBox, Span } from '../atoms';
import { Button, DarkWrapper } from '../atoms';
import { useNavigate } from 'react-router-dom';

interface ToastPopupProps {
  onClick: () => void;
}

const NeedLoginToastPopup = (props: ToastPopupProps) => {
  const navigate = useNavigate();

  const handleToLogin = () => {
    navigate('../');
  };
  return (
    <>
      <DarkWrapper onClick={props.onClick}>
        <ToastPopupBox crossOnClick={props.onClick} cross={true} type='default'>
          <div>
            <Text type='head'>잠깐, 로그인 완료 후</Text>
            <Text type='head'>
              <Span fc='strong'>Copick</Span>을 이용해 주세요!
            </Text>
            <Text type='caption'>
              간편 로그인을 통해 Copick 안에 있는 모든 서비스를
              <br />
              즐기실 수 있어요
            </Text>
          </div>
          <Button type='toastPopup' onClick={handleToLogin}>
            로그인하기
          </Button>
        </ToastPopupBox>
      </DarkWrapper>
    </>
  );
};

export default NeedLoginToastPopup;
