import { useLocation, useNavigate } from 'react-router-dom';
import { Spinner } from '../../components/organisms';

const TasteSurveyLoading = () => {
  const navigate = useNavigate();
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
