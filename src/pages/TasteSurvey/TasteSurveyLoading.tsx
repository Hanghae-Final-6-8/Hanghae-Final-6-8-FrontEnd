import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getObjLocalStorage } from '../../utils/localStorage';
import { useAppDispatch } from '../../redux/configureStore';
import { postTasteSurvey } from '../../redux/modules/taste';

import { testLoading } from '../../assets/images';
import { GridBox, Text } from '../../components/atoms';

const TasteSurveyLoading = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const surveyResult = getObjLocalStorage('surveyResult');

  useEffect(() => {
    setTimeout(() => {
      appDispatch(postTasteSurvey({ surveyResult, navigate }));
    }, 2000);

    // user tasteId를 변경하기 위해 재요청
  }, [appDispatch]);

  return (
    <>
      <GridBox type='flexBasic' className='mt-28'>
        <div className='mx-auto'>
          <img src={testLoading} alt='취향을 분석하고 있어요' />
        </div>
        <div className='mx-auto text-center'>
          <Text type='mainBodyTitle' className='mt-4'>
            원두 취향을 분석하고 있어요!
          </Text>
          <Text type='clickedDescription'>과연 나에게 찰떡인 원두는..?!</Text>
        </div>
      </GridBox>
    </>
  );
};

export default TasteSurveyLoading;
