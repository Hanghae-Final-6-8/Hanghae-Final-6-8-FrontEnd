import { useNavigate } from 'react-router-dom';
import { naver, google } from '../../assets/icons';
import KakaoLoginBtn from '../../components/molecules/KakaoLoginBtn';

import { useAppDispatch } from '../../redux/configureStore';
import { getKakaoURL } from '../../redux/modules/user';
import { Button } from '../../components/atoms';
import { logoCopick, pickYourCoffee } from '../../assets/logo';

const Login = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();

  const handleToMain = () => {
    navigate('../main');
  };

  const handleLoginKakao = async () => {
    await appDispatch(getKakaoURL());
    navigate('/api/user/login/kakao/callback', { replace: true });
  };

  const handleNotReadyToLogin = () => {
    alert(
      '네이버, 구글 로그인은 구현 중 입니다.\n(사이트 완성 후 검수를 받아야 합니다)'
    );
  };

  return (
    <>
      <div className='flex flex-col  px-6 text-center bg-brownS01bg bg-cover h-full'>
        <header className='mt-227px mx-auto'>
          <img src={logoCopick} />
        </header>
        <div className='pt-200px mx-auto w-172px'>
          <img src={pickYourCoffee} />
        </div>
        <p className='text-body pt-3 text-gray60'>간편 회원가입/로그인</p>
        <hr className='mx-auto mt-9px' style={{ width: '100px' }} />
        <div className='mt-2.5'>
          <KakaoLoginBtn onClick={handleLoginKakao} />
          <button
            className='w-50px h-50px  mr-7 rounded-full bg-white shadow-loginBtn'
            onClick={handleNotReadyToLogin}
          >
            <img className='mx-auto' src={naver} />
          </button>
          <button
            className='w-50px h-50px rounded-full bg-white shadow-loginBtn'
            onClick={handleNotReadyToLogin}
          >
            <img className='mx-auto' src={google} />
          </button>
        </div>
        <Button mt='60px' fc='white' fw='500' fs='sub2' onClick={handleToMain}>
          둘러보기
        </Button>
      </div>
    </>
  );
};

export default Login;
