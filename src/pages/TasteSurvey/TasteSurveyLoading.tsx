import { useLocation } from 'react-router-dom';
import { GridBox } from '../../components/atoms';
import { Spinner } from '../../components/organisms';

const TasteSurveyLoading = () => {
  const location = useLocation();
  const tasteList = location.state;
  console.log(tasteList);

  return (
    <>
      <GridBox className='h-full' type='flexBasic'>
        <Spinner />
      </GridBox>
    </>
  );
};

export default TasteSurveyLoading;
