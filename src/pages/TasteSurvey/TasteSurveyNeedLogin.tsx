import { useLocation } from 'react-router-dom';

const TasteSurveyNeedLogin = () => {
  const location = useLocation();
  const tasteList = location.state;
  console.log(tasteList);

  return (
    <>
      <div>NeedLogin 페이지</div>
    </>
  );
};

export default TasteSurveyNeedLogin;
