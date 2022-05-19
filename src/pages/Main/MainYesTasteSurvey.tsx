import { bookmark, down, share, beans, right } from '../../assets/icons/';
import MainModal from '../../components/MainModal';
import { coffee_default } from '../../assets/images';
import {
  RoundBox,
  Text,
  Span,
  GridBox,
  Button,
  Image,
  Chart,
} from '../../components/atoms';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/configureStore';
import { getTasteSurvey } from '../../redux/modules/taste';
import { useEffect, useState } from 'react';

const MainYesTasteSurvey = () => {
  const navigate = useNavigate();
  const tasteList = useSelector((state: RootState) => state.taste);
  const user = useSelector((state: RootState) => state.user);
  const appDispatch = useAppDispatch();

  useEffect(() => {
    user.isLogin && appDispatch(getTasteSurvey());
  }, [user.isLogin, appDispatch]);

  const handelShareByKakaotalk = () => {
    alert('아직 구현 중에 있습니다!');
  };

  const handleToMap = () => {
    alert('아직 구현 중에 있습니다!');
  };
  const handleAddBookmark = () => {
    alert('아직 구현 중에 있습니다!');
  };
  const handleShowDescription = () => {
    alert('아직 구현 중에 있습니다!');
  };
  const handleToClickBeans = () => {
    alert('아직 구현 중에 있습니다!');
  };
  const handleToTasteSurvay = () => {
    navigate('../survey/main');
  };

  // 원두의 향 추가
  const beansFlavorFormdata = [];
  tasteList.floral ? beansFlavorFormdata.push({ id: 1, name: '꽃 향' }) : null;
  tasteList.cocoaFlavor
    ? beansFlavorFormdata.push({ id: 2, name: '코코아 향' })
    : null;
  tasteList.fruitFlavor
    ? beansFlavorFormdata.push({ id: 3, name: '과일 향' })
    : null;
  tasteList.nuttyFlavor
    ? beansFlavorFormdata.push({ id: 4, name: '견과류 향' })
    : null;
  if (beansFlavorFormdata.length === 0) {
    beansFlavorFormdata.push({ id: 5, name: '무난함' });
  }

  const recommendFormdata = [
    { id: 1, name: '파이크 플레이스 로스트', img: coffee_default },
    { id: 2, name: '파이크 플레이스 로스트', img: coffee_default },
    { id: 3, name: '파이크 플레이스 로스트', img: coffee_default },
    { id: 4, name: '파이크 플레이스 로스트', img: coffee_default },
  ];

  return (
    <>
      <main className='relative px-6 py-12 bg-defaultBg01 bg-contain bg-no-repeat bg-fixed w-full h-full'>
        <header className='relative'>
          <strong className='text-head font-500 text-white'>Copick</strong>
          <button
            className='absolute top-0 right-0 w-8'
            onClick={handleAddBookmark}
          >
            <img className='w-full' src={bookmark} />
          </button>
        </header>
        <div className='absolute px-6 pb-6 left-0 top-56 rounded-t-40px bg-white w-full shadow-main'>
          <article className='relative -top-28'>
            <figure className='relative'>
              <div>
                <img className='mx-auto' src={coffee_default} />
              </div>
              <figcaption className='text-center text-sub2 font-500 mt-26px'>
                <strong className='block'>{tasteList.beanName}</strong>
                <Text className='inline-block mt-1.5 font-400 text-body bg-brownS03 px-2.5 py-0.75 rounded-xl text-brownS02'>
                  {tasteList.type === 1 ? '싱글 오리진' : '블렌드'}
                </Text>
              </figcaption>
            </figure>
            <p className='mt-3 text-body font-400 line-clamp-2 h-10 text-gray-400'>
              {tasteList.description}
            </p>
            <button className='block mx-auto' onClick={handleShowDescription}>
              <img src={down} />
            </button>
            <RoundBox type='mainRoundBox'>
              <Text type='mainSubTitle'>
                <img src={beans} />
                원두의 맛
              </Text>
              <Chart
                beansData={[
                  tasteList.acidity,
                  tasteList.sweetness,
                  tasteList.nutty,
                  tasteList.body,
                  tasteList.bitter,
                ]}
              />
            </RoundBox>
            <RoundBox className='mt-2.5' type='mainRoundBox'>
              <Text type='mainSubTitle'>
                <img src={beans} />
                원두의 향
              </Text>
              <div className='flex gap-1'>
                {beansFlavorFormdata.map((item) => (
                  <Text key={item.id} type='mainBeansFlavor'>
                    {item.name}
                  </Text>
                ))}
              </div>
            </RoundBox>
            <GridBox className='mt-12'>
              <Text type='mainBodyTitle'>
                <Span type='strong'>{tasteList.beanName}</Span>를
              </Text>
              <Text type='mainBodyTitle'>맛볼 수 있는 카페는?</Text>
              <RoundBox
                className='text-center relative overflow-hidden mt-5'
                type='mainRoundBox'
                cafeId={tasteList.cafeId}
                onClick={handleToMap}
              >
                <div className='absolute top-0 left-0 right-0 h-72px bg-defaultBg01'>
                  {/*  */}
                </div>
                <Image
                  className='mx-auto'
                  type='circle'
                  src={
                    tasteList.cafeImage ? tasteList.cafeImage : coffee_default
                  }
                />
                <Text className='mt-1.5 text-gray90 font-500 text-body'>
                  {tasteList.cafeName}
                </Text>
                <Text className='mt-1.5 text-gray80 text-caption'>
                  매장 위치 보러가기
                  <img
                    className='inline w-4'
                    style={{ filter: 'f' }}
                    src={right}
                  />
                </Text>
              </RoundBox>
            </GridBox>
            <GridBox className='mt-12'>
              <Text type='mainBodyTitle'>
                <Span type='strong'>{tasteList.beanName}</Span>와
              </Text>
              <Text type='mainBodyTitle'>비슷한 원두도 있어요!</Text>
              <GridBox type='mainRecommendSimmilar'>
                {recommendFormdata.map((item) => (
                  <RoundBox
                    key={item.id}
                    type='mainRoundBox'
                    onClick={handleToClickBeans}
                  >
                    <div className='w-20 mx-auto'>
                      <img className='h-90px mx-auto' src={item.img} />
                      <Text type='mainRedcommendSimmilar'>{item.name}</Text>
                    </div>
                  </RoundBox>
                ))}
              </GridBox>
            </GridBox>
            <Button
              className='text-white font-500 text-sub2 mt-12'
              type='brownPType'
              onClick={handleToTasteSurvay}
            >
              테스트 다시하기
            </Button>
          </article>
        </div>
        <button
          className='fixed w-12 h-12 rounded-full z-10 bg-brownP bg-cover bg-right bottom-104px right-6 shadow-tasteBrown'
          onClick={handelShareByKakaotalk}
        >
          <img
            className='mx-auto '
            src={share}
            style={{
              filter:
                'invert(95%) sepia(0%) saturate(21%) hue-rotate(357deg) brightness(104%) contrast(108%)',
            }}
          />
        </button>
      </main>
      <MainModal />
    </>
  );
};

export default MainYesTasteSurvey;
