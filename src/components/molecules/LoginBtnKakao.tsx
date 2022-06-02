import { kakao } from '../../assets/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/configureStore';
import { getKakaoURL } from '../../redux/modules/user';
import { Button } from '../atoms';

const LoginBtnKakao = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const handleLoginKakao = async () => {
    navigate('/api/user/login/kakao/callback', { replace: true });
    await appDispatch(getKakaoURL());
  };

  return (
    <>
      <Button type='loginBtn' onClick={handleLoginKakao}>
        <img className='mx-auto' src={kakao} />
      </Button>
    </>
  );
};

export default LoginBtnKakao;
