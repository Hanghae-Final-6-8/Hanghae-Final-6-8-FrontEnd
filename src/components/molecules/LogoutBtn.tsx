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
      <Button className='text-white' type='brownPType' onClick={handleLogout}>
        로그아웃하기
      </Button>
    </>
  );
};

export default LogoutBtn;
