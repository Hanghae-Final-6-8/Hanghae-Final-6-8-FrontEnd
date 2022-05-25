import MainModal from '../../components/MainModal';
import { right } from '../../assets/icons';
import {
  RoundBox,
  Text,
  GridBox,
  Span,
  Image,
  Button,
  Hr,
} from '../../components/atoms';
import { mainHeaderImg } from '../../assets/images';
import { MainTopCarousel } from '../../components/organisms';
import { useNavigate } from 'react-router-dom';
import { coffee_default } from '../../assets/images';
import { copick } from '../../assets/logo';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/configureStore';
import { useEffect } from 'react';
import { getBeansListByCafeMain } from '../../redux/modules/cafe';
import { getBeansListType } from '../../redux/modules/beans';

const MainNoTasteSurvey = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const { cafeListMain, isMainLoaded } = useSelector(
    (state: RootState) => state.cafe
  );
  const { beanlist } = useSelector((state: RootState) => state.beans);

  const handleToTasteSurvay = () => {
    navigate('../survey/main');
  };
  useEffect(() => {
    appDispatch(getBeansListType(1));
    !isMainLoaded && appDispatch(getBeansListByCafeMain());
  }, [appDispatch]);

  const beansByTypeFormdata: {
    beanId: number;
    beanName: string;
    description: null;
    type: number;
    beanImage: null;
  }[] = [];
  beanlist.forEach((el) => {
    beansByTypeFormdata.push(el);
  });
  console.log(beansByTypeFormdata);

  const beansNumByCafeFormdata: {
    beansCount: number;
    cafeBackGroundImage: string;
    cafeId: number;
    cafeLogoImage: string;
    cafeName: string;
  }[] = [];
  cafeListMain.forEach((el) => {
    beansNumByCafeFormdata.push(el);
  });

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
            <div className='flex mt-5'>
              <button className='bg-brownS02 mr-2 text-white rounded-xl px-2.5 py-[3px] font-700 text-body'>
                블렌드
              </button>
              <button className='bg-white mr-2 border text-brownS02 rounded-xl px-2.5 py-[3px] text-body'>
                싱글 오리진
              </button>
            </div>
            <div className='flex'>
              {beansByTypeFormdata.map((item) => (
                <RoundBox
                  type='mainRoundBox'
                  className='w-40'
                  key={item.beanId}
                >
                  <div className='w-20 mx-auto'>
                    <img
                      className='h-90px mx-auto'
                      src={item.beanImage ? item.beanImage : coffee_default}
                      alt={item.beanName}
                    />
                    <Text type='mainRedcommendSimmilar'>{item.beanName}</Text>
                  </div>
                </RoundBox>
              ))}
            </div>
            <Text type='main2header' className='mt-12'>
              111개의 브랜드 원두로
            </Text>
            <Text type='main2header' className=''>
              어떤 취향이든
            </Text>
            <Text className='text-gray80 text-body mt-1.5'>
              뭘 좋아할지 몰라 다 준비했습니다!
            </Text>
            <div className='mt-5'>
              {beansNumByCafeFormdata.map((item) => (
                <RoundBox
                  key={item.cafeId}
                  className={`relative items-center flex w-[280px] bg-slate-500 overflow-hidden`}
                  type='main2RoundBox'
                >
                  <img
                    className='object-cover w-full h-full absolute left-0 top-0 bottom-0 right-0'
                    src={item.cafeBackGroundImage}
                    alt={item.cafeName}
                  />
                  <Image
                    className='shrink-0 mr-3  w-16 h-16'
                    type='circle'
                    src={item.cafeLogoImage}
                    alt={item.cafeName}
                  />
                  <div className='z-10'>
                    <Text className='text-white text-sub2 font-500 drop-shadow-[0_0_3px_rgba(17,17,17,0.7)]'>
                      {item.cafeName}
                    </Text>
                    <Text className='text-white bg-brownS02/75 text-caption px-2.5 py-[3px] rounded-lg'>
                      원두 종류 {item.beansCount}가지
                    </Text>
                  </div>
                </RoundBox>
              ))}
            </div>
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
