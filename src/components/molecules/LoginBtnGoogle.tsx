import { google } from '../../assets/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/configureStore';
import { getGoogleURL } from '../../redux/modules/user';
import { Button } from '../atoms';

const LoginBtnGoogle = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const handleLoginGoogle = async () => {
    navigate('/api/user/login/google/callback', { replace: true });
    await appDispatch(getGoogleURL());
  };

  return (
    <Button type='loginBtn' className='mr-0' onClick={handleLoginGoogle}>
      <img className='mx-auto' src={google} />
    </Button>
  );
};

export default LoginBtnGoogle;
