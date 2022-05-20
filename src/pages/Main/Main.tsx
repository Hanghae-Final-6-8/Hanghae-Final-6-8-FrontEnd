import MainYesTasteSurvey from './MainYesTasteSurvey';
import MainNoTasteSurvey from './MainNoTasteSurvey';
import { useSelector } from 'react-redux';

const Main = () => {
  return (
    <>
      <MainNoTasteSurvey />
      {/* <MainYesTasteSurvey /> */}
    </>
  );
};

export default Main;
