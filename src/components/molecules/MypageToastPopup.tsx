import { DarkWrapper, ToastPopupBox, Text, Button } from '../atoms';
import LogoutBtn from './LogoutBtn';
import { useAppDispatch } from '../../redux/configureStore';
import { deleteUser } from '../../redux/modules/user';

interface MypageToastPopupProps {
  onClick: () => void;
}

const MypageToastPopup = (props: MypageToastPopupProps) => {
  const appDispatch = useAppDispatch();

  const handleUserDelete = () => {
    if (confirm('정말로 탈퇴하시겠습니까?')) {
      appDispatch(deleteUser());
    } else {
      return;
    }
  };

  return (
    <DarkWrapper onClick={props.onClick}>
      <ToastPopupBox className=' mb-34px' type='default' cross>
        <Text type='head'>어떤 것을 도와드릴까요?</Text>
        <LogoutBtn />
        {/* <Button className='mt-4' type='selectBtn' onClick={handleUserDelete}>
          탈퇴하기
        </Button> */}
      </ToastPopupBox>
    </DarkWrapper>
  );
};

export default MypageToastPopup;
