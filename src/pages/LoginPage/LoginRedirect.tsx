import { useEffect } from 'react';
import { Spinner } from '../../components/organisms';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/configureStore';
import { loginKakao } from '../../redux/modules/user';

const LoginRedirect = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();

  const codeInput = new URL(location.href).searchParams.get('code')!;

  useEffect(() => {
    const kakaoDispatch = async () => {
      try {
        await appDispatch(loginKakao({ codeInput, navigate }));
        //navigate('/main', { replace: true });
      } catch (err) {
        console.log(err);
      }
    };
    kakaoDispatch();
  }, [appDispatch, navigate]);

  return <Spinner />;
};

export default LoginRedirect;
