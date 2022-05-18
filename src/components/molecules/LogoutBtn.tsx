import { Button } from '../atoms';
import { useAppDispatch } from '../../redux/configureStore';
import { logout } from '../../redux/modules/user';

const LogoutBtn = () => {
  const appDispatch = useAppDispatch();
  const handleLogout = () => {
    appDispatch(logout());
  };

  return (
    <>
      <Button onClick={handleLogout}>로그아웃 테스트 버튼</Button>
    </>
  );
};

export default LogoutBtn;
