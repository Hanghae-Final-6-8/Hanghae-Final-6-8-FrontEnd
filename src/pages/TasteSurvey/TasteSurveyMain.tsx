import { Button, Text, Span } from '../../components/atoms';
import { useNavigate } from 'react-router-dom';
import { imgExample } from '../../assets/images';

const TasteSurveyMain = () => {
  const navigate = useNavigate();

  const handleToTasteStart = () => {
    navigate('../01');
  };

  return (
    <>
      <div className='flex flex-col text-center'>
        <div className='mt-152px'>
          <Text fs='head' fw='500'>
            나에게 딱 맞는
          </Text>
          <Text fs='head' fw='500'>
            <Span fc='strong'>원두</Span>는 무엇일까?
          </Text>
        </div>
        <div className='mx-auto mt-30px h-250px'>
          <img src={imgExample} />
        </div>
        <div className='mt-30px'>
          <Text fw='500' fs='body'>
            40초로 알아보는 나의 원두 취향
          </Text>
          <Text fs='caption' fc='gray60'>
            객관식의 6문항으로 40초면 충분해요!
          </Text>
        </div>
      </div>
      <Button fc='white' type='tasteSurvey' onClick={handleToTasteStart}>
        테스트 시작하기
      </Button>
    </>
  );
};

export default TasteSurveyMain;
