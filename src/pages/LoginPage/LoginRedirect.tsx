import { useEffect } from 'react';
import { Spinner } from '../../components/organisms';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../redux/configureStore';
import { loginKakao, loginNaver, loginGoogle } from '../../redux/modules/user';
import queryString from 'query-string';

const LoginRedirect = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const location = useLocation();
  const codeInput: string = queryString.parse(location.search).code as string;
  const pathChecker = location.pathname.split('/')[4];

  useEffect(() => {
    const kakaoDispatch = async () => {
      try {
        await appDispatch(loginKakao({ codeInput, navigate }));
        navigate('/main', { replace: true });
      } catch (err) {
        console.log(err);
      }
    };
    const naverDispatch = async () => {
      try {
        await appDispatch(loginNaver({ codeInput, navigate }));
        navigate('/main', { replace: true });
      } catch (err) {
        console.log(err);
      }
    };
    const googleDispatch = async () => {
      try {
        await appDispatch(loginGoogle({ codeInput, navigate }));
        navigate('/main', { replace: true });
      } catch (err) {
        console.log(err);
      }
    };
    pathChecker === 'kakao' ? kakaoDispatch() : null;
    pathChecker === 'naver' ? naverDispatch() : null;
    pathChecker === 'google' ? googleDispatch() : null;
  }, [appDispatch, navigate]);

  return <Spinner />;
};

export default LoginRedirect;
