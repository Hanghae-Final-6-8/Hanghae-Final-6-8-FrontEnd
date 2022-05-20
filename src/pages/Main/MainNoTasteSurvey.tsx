import MainModal from '../../components/MainModal';
import { RoundBox, Text, GridBox, Span, Button } from '../../components/atoms';
import { mainHeaderImg } from '../../assets/images';
import { MainTopCarousel } from '../../components/organisms';
import { useNavigate } from 'react-router-dom';

const MainNoTasteSurvey = () => {
  const navigate = useNavigate();
  const handleToTasteSurvay = () => {
    navigate('../survey/main');
  };
  return (
    <>
      <main className='relative px-6 py-12 bg-mainBrownBg bg-no-repeat bg-fixed w-full h-full '>
        <img className='absolute right-0 top-[27px]' src={mainHeaderImg} />
        <header className='relative'>
          <strong className='text-head font-500 text-white'>Copick</strong>
        </header>

        <Text type='main2header' className='absolute text-white mt-[56px]'>
          커피수혈도 이젠
        </Text>
        <Text type='main2header' className='absolute text-white mt-[90px]'>
          나에게 맞는 원두로{' '}
        </Text>
        <Text className='absolute text-white mt-[130px] text-body'>
          테스트를 통해 알아보는 나의 원두 취향!
        </Text>

        <div className='absolute px-6 pb-6 left-0 top-[260px] rounded-t-40px bg-white w-full shadow-main'>
          <MainTopCarousel />
          <Button>버튼</Button>
          <Button
            className='text-white font-500 text-sub2 mt-12'
            type='brownPType'
            onClick={handleToTasteSurvay}
          >
            원두 취향 테스트 하기
          </Button>
        </div>
      </main>
      <MainModal />
    </>
  );
};

export default MainNoTasteSurvey;
