import MainModal from '../../components/MainModal';
import { right } from '../../assets/icons';
import {
  RoundBox,
  Text,
  GridBox,
  Span,
  Button,
  Hr,
} from '../../components/atoms';
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

        <div className='absolute px-6 pb-6 left-0 top-[330px] bg-white w-full shadow-main'>
          <div className='relative -top-14 pb-9'>
            <MainTopCarousel />
            <button
              className='relative left-1/2 -translate-x-1/2 mx-auto mb-34px'
              onClick={handleToTasteSurvay}
            >
              <Text className='block mt-7 w-[174px] bg-white text-gray60 text-caption text-center rounded-3xl shadow-contents'>
                원두 취향 테스트 하기
                <img
                  className='inline w-4'
                  style={{ filter: '' }}
                  src={right}
                />
              </Text>
            </button>
            <Hr type='taste327' />
            <Text type='main2header' className='mt-34px'>
              늘 마시는 모닝커피를
            </Text>
            <Text type='main2header' className=''>
              더 색다르게
            </Text>
            <Text className='text-gray80 mt-[130px] text-body mt-1.5'>
              잠을 깨기 위한 처방약 같은 커피는 그만!
            </Text>
            <Button
              className='text-white font-500 text-sub2 mt-12'
              type='brownPType'
              onClick={handleToTasteSurvay}
            >
              원두 취향 테스트 하기
            </Button>
          </div>
        </div>
      </main>
      <MainModal />
    </>
  );
};

export default MainNoTasteSurvey;
