import { useEffect } from 'react';
import { SpinnerSuspense } from '../../components/molecules';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../redux/configureStore';
import { loginKakao, loginNaver, loginGoogle } from '../../redux/modules/user';
import queryString from 'query-string';
import { getObjLocalStorage } from '../../utils/localStorage';

const LoginRedirect = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const location = useLocation();
  const codeInput: string = queryString.parse(location.search).code as string;
  const pathChecker = location.pathname.split('/')[4];
  const surveyResult = getObjLocalStorage('surveyResult');

  useEffect(() => {
    const kakaoDispatch = async () => {
      try {
        await appDispatch(loginKakao({ codeInput, navigate }));
        if (surveyResult) {
          navigate('/survey/loading');
          return;
        }
        navigate('/main', { replace: true });
      } catch (err) {
        return;
      }
    };
    const naverDispatch = async () => {
      try {
        await appDispatch(loginNaver({ codeInput, navigate }));
        if (surveyResult) {
          navigate('/survey/loading');
          return;
        }
        navigate('/main', { replace: true });
      } catch (err) {
        return;
      }
    };
    const googleDispatch = async () => {
      try {
        await appDispatch(loginGoogle({ codeInput, navigate }));
        if (surveyResult) {
          navigate('/survey/loading');
          return;
        }
        navigate('/main', { replace: true });
      } catch (err) {
        return;
      }
    };
    pathChecker === 'kakao' ? kakaoDispatch() : null;
    pathChecker === 'naver' ? naverDispatch() : null;
    pathChecker === 'google' ? googleDispatch() : null;
  }, [appDispatch, navigate]);

  return <SpinnerSuspense />;
};

export default LoginRedirect;
