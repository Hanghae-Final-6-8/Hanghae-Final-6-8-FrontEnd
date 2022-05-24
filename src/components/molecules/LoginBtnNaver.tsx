import { naver } from '../../assets/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/configureStore';
import { getNaverURL } from '../../redux/modules/user';

const LoginBtnNaver = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const handleLoginNaver = async () => {
    await appDispatch(getNaverURL());
    navigate('/api/user/login/naver/callback', { replace: true });
  };
  return (
    <button
      className='w-50px h-50px  mr-7 rounded-full bg-white shadow-loginBtn'
      onClick={handleLoginNaver}
    >
      <img className='mx-auto' src={naver} />
    </button>
  );
};

export default LoginBtnNaver;
