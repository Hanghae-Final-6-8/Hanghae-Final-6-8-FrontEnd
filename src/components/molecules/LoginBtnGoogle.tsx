import { google } from '../../assets/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/configureStore';
import { getGoogleURL } from '../../redux/modules/user';

const LoginBtnGoogle = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const handleLoginGoogle = async () => {
    await appDispatch(getGoogleURL());
    navigate('/api/user/login/google/callback', { replace: true });
  };

  return (
    <button
      className='w-50px h-50px rounded-full bg-white shadow-loginBtn'
      onClick={handleLoginGoogle}
    >
      <img className='mx-auto' src={google} />
    </button>
  );
};

export default LoginBtnGoogle;
