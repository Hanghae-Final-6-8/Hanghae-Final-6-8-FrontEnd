import MainYesTasteSurvey from './MainYesTasteSurvey';
import MainNoTasteSurvey from './MainNoTasteSurvey';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/configureStore';
import { useEffect } from 'react';
import { AppDispatch } from '../../redux/configureStore';
import { auth } from '../../redux/modules/user';
import { getAccessTokenFromCookie } from '../../utils/cookie';

const Main = () => {
  const appDispatch = useAppDispatch();
  const isToken = getAccessTokenFromCookie();
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (user.tasteId === '' || user.tasteId === null) {
      isToken && appDispatch(auth());
    }
  }, []);

  return (
    <>
      {user.tasteId === '' || user.tasteId === null ? (
        <MainNoTasteSurvey />
      ) : (
        <MainYesTasteSurvey />
      )}
    </>
  );
};

export default Main;
