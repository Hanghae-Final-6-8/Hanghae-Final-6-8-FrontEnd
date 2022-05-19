import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Spinner } from '../../components/organisms';
import { getObjLocalStorage } from '../../utils/localstorage';
import { useAppDispatch } from '../../redux/configureStore';
import { postTasteSurvey } from '../../redux/modules/taste';

const TasteSurveyLoading = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const surveyResult = getObjLocalStorage('surveyResult');

  useEffect(() => {
    appDispatch(postTasteSurvey({ surveyResult, navigate }));
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
