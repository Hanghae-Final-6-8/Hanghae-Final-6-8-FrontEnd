import { useLocation } from 'react-router-dom';
import {
  setObjLocalStorage,
  getObjLocalStorage,
} from '../../utils/localstorage';

const TasteSurveyNeedLogin = () => {
  const location = useLocation();
  const tasteList = location.state;
  console.log(tasteList);

  // console.log(getObjLocalStorage('result'));

  return (
    <>
      <div>NeedLogin 페이지</div>
    </>
  );
};

export default TasteSurveyNeedLogin;
