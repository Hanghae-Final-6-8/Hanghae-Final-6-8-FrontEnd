import { useLocation } from 'react-router-dom';

const TasteSurveyLoading = () => {
  const location = useLocation();
  const tasteList = location.state;
  console.log(tasteList);

  return (
    <>
      <div>Loading 페이지</div>
    </>
  );
};

export default TasteSurveyLoading;
