import { kakao } from '../../assets/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/configureStore';
import { getKakaoURL } from '../../redux/modules/user';

const LoginBtnKakao = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const handleLoginKakao = async () => {
    await appDispatch(getKakaoURL());
    navigate('/api/user/login/kakao/callback', { replace: true });
  };

  return (
    <>
      <button
        className='w-50px h-50px mr-7 rounded-full bg-white shadow-loginBtn'
        onClick={handleLoginKakao}
      >
        <img className='mx-auto' src={kakao} />
      </button>
    </>
  );
};

export default LoginBtnKakao;
