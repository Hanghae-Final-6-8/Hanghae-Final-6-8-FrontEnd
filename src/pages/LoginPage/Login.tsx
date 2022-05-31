import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/atoms';
import { logoCopick, pickYourCoffee } from '../../assets/logo';
import { LoginBtnGroup } from '../../components/organisms';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configureStore';

const Login = () => {
  const navigate = useNavigate();
  const { isLogin } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    isLogin && navigate('/main');
  }, [isLogin, navigate]);

  const handleToMain = () => {
    navigate('../main');
  };

  return (
    <>
      <div className='flex flex-col  px-6 text-center bg-brownS01bg bg-cover h-full touch-none'>
        <header className='mt-180px mx-auto'>
          <img className='h-20' src={logoCopick} />
        </header>
        <div className='mt-[148px] mx-auto w-172px'>
          <img src={pickYourCoffee} />
        </div>
        <LoginBtnGroup className='pt-3' />
        <Button
          className='mt-10 bg-brownP text-white font-500 text-sub2  hover:brightness-75 active:brightness-75 shadow-tasteBrown  transition ease-in'
          onClick={handleToMain}
        >
          둘러보기
        </Button>
      </div>
    </>
  );
};

export default Login;
