import { Button, Text, Span } from '../../components/atoms';
import { useNavigate } from 'react-router-dom';

const TasteSurvey01 = () => {
  const navigate = useNavigate();
  const handleToNextPage = () => {
    navigate('../02');
  };

  return (
    <>
      <div className='flex flex-col'>
        <Text type='tasteNumber'>01</Text>
        <Text fw='500' fs='sub'>
          <Span fc='strong'>신 맛</Span>을 좋아하시나요?
        </Text>
      </div>

      <Button fc='white' type='tasteSurvey' onClick={handleToNextPage}>
        다음
      </Button>
    </>
  );
};

export default TasteSurvey01;
