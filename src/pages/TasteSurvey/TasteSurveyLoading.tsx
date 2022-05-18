import { useLocation } from 'react-router-dom';
import { GridBox } from '../../components/atoms';
import { Spinner } from '../../components/organisms';

const TasteSurveyLoading = () => {
  const location = useLocation();
  const tasteList = location.state;
  console.log(tasteList);

  return (
    <>
      <Spinner />
    </>
  );
};

export default TasteSurveyLoading;
