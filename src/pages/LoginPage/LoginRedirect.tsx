import { useEffect } from 'react';
import { Spinner } from '../../components/organisms';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../redux/configureStore';
import { loginKakao, loginNaver, loginGoogle } from '../../redux/modules/user';
import queryString from 'query-string';

const LoginRedirect = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const { search } = useLocation();
  const codeInput: string = queryString.parse(search).code as string;

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
