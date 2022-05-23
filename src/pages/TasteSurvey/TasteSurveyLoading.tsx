import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Spinner } from '../../components/organisms';
import { getObjLocalStorage } from '../../utils/localStorage';
import { useAppDispatch } from '../../redux/configureStore';
import { postTasteSurvey } from '../../redux/modules/taste';
import { auth } from '../../redux/modules/user';

const TasteSurveyLoading = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const surveyResult = getObjLocalStorage('surveyResult');

  useEffect(() => {
    appDispatch(postTasteSurvey({ surveyResult, navigate }));
    // user tasteId를 변경하기 위해 재요청
  }, []);
  //console.log(surveyResult);

  // const navigate = useNavigate();
  // const location = useLocation();
  // const tasteList = location.state;
  // console.log(tasteList);

  return (
    <>
      <Spinner />
    </>
  );
};

export default TasteSurveyLoading;
