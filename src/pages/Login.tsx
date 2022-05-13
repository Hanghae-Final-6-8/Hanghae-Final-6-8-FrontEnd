import { useNavigate } from 'react-router-dom';
import { naver, google } from '../assets/icons/index';
import KakaoLoginBtn from '../components/molecules/KakaoLoginBtn';

import { useAppDispatch } from '../redux/configureStore';
import { loginKakao, auth } from '../redux/modules/user';

const Login = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();

  const handleToMain = () => {
    navigate('../main');
  };

  const handleLoginKakao = () => {
    alert('클릭');
    appDispatch(auth);
    //console.log(process.env.REACT_APP_BASE_URL);
    // console.log(dispatch(loginKakao));
    // console.log(loginKakao);
  };

  return (
    <>
      <div className='flex flex-col px-6 py-12 text-center'>
        <header className='mt-120px'>
          <strong className='text-[44px] font-500'>copick</strong>
          <p className='font-400 text-body mt-2'>나만의 원두로 시작하는 일상</p>
        </header>
        <p className='text-body mt-289px text-gray-400'>간편 회원가입/로그인</p>
        <hr className='mx-auto mt-9px' style={{ width: '100px' }} />
        <div className='mt-2.5'>
          <KakaoLoginBtn onClick={handleLoginKakao} />
          <button
            className='w-50px h-50px  mr-7 rounded-full bg-white shadow-loginBtn'
            onClick={handleLoginKakao}
          >
            <img className='mx-auto' src={naver} />
          </button>
          <button className='w-50px h-50px rounded-full bg-white shadow-loginBtn'>
            <img className='mx-auto' src={google} />
          </button>
        </div>
        <button
          className='w-full mt-60px mt bg-stone-400 text-white rounded-btn font-500 text-sub2 py-2.5'
          onClick={handleToMain}
        >
          둘러보기
        </button>
      </div>
    </>
  );
};

export default Login;
