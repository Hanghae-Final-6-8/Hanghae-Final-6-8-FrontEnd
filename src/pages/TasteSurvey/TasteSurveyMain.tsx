import { Button } from '../../components/atoms';
import { useNavigate } from 'react-router-dom';

const TasteSurveyMain = () => {
  const navigate = useNavigate();

  const handleToTasteStart = () => {
    navigate('../01');
  };

  return (
    <>
      <div className='flex flex-col text-center'>
        <div className='mt-104px'>
          <p>나에게 딱 맞는</p>
          <p>원두는 무엇일까?</p>
        </div>
        <div className='mx-auto mt-30px w-200px h-200px bg-gray-300 rounded-full'>
          <img />
        </div>
        <div className='mt-30px'>
          <p>40초로 알아보는 나의 원두 취향</p>
          <p>객관식의 6문항으로 40초면 충분해요!</p>
        </div>
        <Button onClick={handleToTasteStart}>테스트 시작하기</Button>
      </div>
    </>
  );
};

export default TasteSurveyMain;
