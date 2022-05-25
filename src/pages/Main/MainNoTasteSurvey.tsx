import MainModal from '../../components/MainModal';
import { right } from '../../assets/icons';
import { Text, Button, Hr } from '../../components/atoms';
import { mainHeaderImg } from '../../assets/images';
import {
  MainTopCarousel,
  MainMidCarousel,
  MainBottomCarousel,
} from '../../components/molecules';
import { useNavigate } from 'react-router-dom';

import { copick } from '../../assets/logo';

const MainNoTasteSurvey = () => {
  const navigate = useNavigate();

  const handleToTasteSurvay = () => {
    navigate('../survey/main');
  };

  return (
    <>
      <main className='relative px-6 py-12 bg-mainBrownBg bg-cover bg-no-repeat bg-fixed w-full h-full '>
        <img className='absolute right-0 top-[27px]' src={mainHeaderImg} />
        <header className='relative h-60px'>
          <img className='h-3.5' src={copick} />
        </header>
        <Text type='main2header' className='absolute text-white mt-30px'>
          커피수혈도 이젠
        </Text>
        <Text type='main2header' className='absolute text-white mt-[64px]'>
          나에게 맞는 원두로
        </Text>
        <Text className='absolute text-white mt-28 text-body'>
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
            <Text className='text-gray80 text-body mt-1.5'>
              잠을 깨기 위한 처방약 같은 커피는 그만!
            </Text>

            <MainMidCarousel />
            <Text type='main2header' className='mt-12'>
              111개의 브랜드 원두로
            </Text>
            <Text type='main2header' className=''>
              어떤 취향이든
            </Text>
            <Text className='text-gray80 text-body mt-1.5'>
              뭘 좋아할지 몰라 다 준비했습니다!
            </Text>
            <MainBottomCarousel />
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
