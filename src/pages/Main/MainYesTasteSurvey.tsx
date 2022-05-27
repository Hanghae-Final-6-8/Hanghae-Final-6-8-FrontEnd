import {
  bookmark,
  down,
  up,
  share,
  beans,
  right,
  left,
  bookmark_full,
} from '../../assets/icons/';
import { coffee_default } from '../../assets/images';
import {
  RoundBox,
  Text,
  Span,
  GridBox,
  Button,
  Image,
  Chart,
  PrevBtn,
  KakaoShare,
} from '../../components/atoms';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/configureStore';
import { getTasteSurvey, getSimilarBeans } from '../../redux/modules/taste';
import { detailBeans } from '../../redux/modules/beans';
import { useEffect, useState } from 'react';
import { logoCopickSquare, copick } from '../../assets/logo';
import { addFavoriteList } from '../../redux/modules/favorite';

const MainYesTasteSurvey = () => {
  const navigate = useNavigate();
  const { beanId } = useParams();
  const appDispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user);
  const tasteList = !beanId
    ? useSelector((state: RootState) => state.taste)
    : useSelector((state: RootState) => state.beans.beansDetail);
  const [randomBg, setRandomBg] = useState(0);
  const [clickedDesc, setClickedDesc] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // 배경 랜덤 함수
  useEffect(() => {
    setRandomBg(Math.floor(Math.random() * 5));
  }, [setRandomBg]);
  const selectRandomBg = (num: number) => {
    const bgList = [
      'bg-defaultBg01',
      'bg-defaultBg02',
      'bg-defaultBg03',
      'bg-defaultBg04',
      'bg-defaultBg05',
    ];
    return bgList[num];
  };

  useEffect(() => {
    // 리덕스에 데이터가 null일 경우 API를 요청합니다.
    user.isLogin && !tasteList.beanName && appDispatch(getTasteSurvey());
    if (!beanId) {
      appDispatch(getSimilarBeans());
    }
  }, [tasteList.beanName, beanId, appDispatch]);

  useEffect(() => {
    if (tasteList.favoritesId) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [tasteList.favoritesId]);

  const handleToMap = (cafeName: string) => {
    navigate(`/map/${cafeName}`);
  };

  const handleAddBookmark = (e: {
    currentTarget: { getAttribute: (arg0: string) => void };
  }) => {
    const currentTargetValue = Number(
      e.currentTarget.getAttribute('data-beanid')
    );
    if (!user.isLogin) {
      return;
    }
    if (isFavorite) {
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
    }

    appDispatch(addFavoriteList(currentTargetValue));
  };

  const handleShowDescription = () => {
    if (clickedDesc) {
      setClickedDesc(false);
    } else {
      setClickedDesc(true);
    }
  };

  const handleToClickBeans = (e: {
    currentTarget: { getAttribute: (arg0: string) => void };
  }) => {
    const currentTargetValue = Number(
      e.currentTarget.getAttribute('data-beanid')
    );
    appDispatch(detailBeans(currentTargetValue));
    navigate(`/beans/${currentTargetValue}`);
  };

  const handleToTasteSurvay = () => {
    navigate('/survey/main');
  };

  // 원두의 향 추가
  const beansFlavorFormdata = [];
  if (tasteList) {
    tasteList.floral
      ? beansFlavorFormdata.push({ id: 1, name: '꽃 향' })
      : null;
    tasteList.cocoaFlavor
      ? beansFlavorFormdata.push({ id: 2, name: '코코아 향' })
      : null;
    tasteList.fruitFlavor
      ? beansFlavorFormdata.push({ id: 3, name: '과일 향' })
      : null;
    tasteList.nuttyFlavor
      ? beansFlavorFormdata.push({ id: 4, name: '견과류 향' })
      : null;
  }
  if (beansFlavorFormdata.length === 0) {
    beansFlavorFormdata.push({ id: 5, name: '무난함' });
  }

  // 비슷한 원두 추천
  const recommendFormdata: {
    beanId: number;
    beanName: string;
    description: string;
    beanImage: string;
    type: number;
  }[] = [];
  if (tasteList.similar) {
    tasteList.similar.forEach((el) => {
      recommendFormdata.push(el);
    });
  }

  return (
    <>
      <main
        className={`relative px-6 py-12 bg-brownS02 ${selectRandomBg(
          randomBg
        )} bg-contain bg-no-repeat bg-fixed w-full h-full`}
      >
        <header className={!beanId ? 'relative pt-2' : 'relative'}>
          {!beanId ? (
            <img className='h-3.5' src={copick} />
          ) : (
            <PrevBtn className='filter-gray30' />
          )}
          <button
            className='absolute top-0 right-0 w-8'
            onClick={handleAddBookmark}
            data-beanid={tasteList.beanId}
          >
            <img
              className='w-full '
              src={isFavorite ? bookmark_full : bookmark}
            />
          </button>
        </header>
        <div className='absolute px-6 pb-6 left-0 top-56 rounded-t-40px bg-white w-full shadow-main'>
          <article className='relative -top-28'>
            <figure className='relative'>
              <div>
                <img
                  className='mx-auto'
                  src={
                    tasteList.beanImage ? tasteList.beanImage : coffee_default
                  }
                />
              </div>
              <figcaption className='text-center text-sub2 font-500 mt-26px'>
                <strong className='block'>{tasteList.beanName}</strong>
                <Text className='inline-block mt-1.5 font-400 text-body bg-brownS03 px-2.5 py-0.75 rounded-xl text-brownS02'>
                  {tasteList.type === 1 ? '싱글 오리진' : '블렌드'}
                </Text>
              </figcaption>
            </figure>
            <Text type={clickedDesc ? 'clickedDescription' : 'description'}>
              {tasteList.description}
            </Text>
            {tasteList.description.length > 65 ? (
              <button className='block mx-auto' onClick={handleShowDescription}>
                <img src={clickedDesc ? up : down} />
              </button>
            ) : null}
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
                onClick={() => {
                  handleToMap(tasteList.cafeName ? tasteList.cafeName : '');
                }}
              >
                <div className='absolute top-0 left-0 right-0 h-72px bg-defaultBg01'>
                  <img
                    className='w-full'
                    src={
                      tasteList.cafeBackGroundImage
                        ? tasteList.cafeBackGroundImage
                        : ''
                    }
                  />
                </div>
                <Image
                  className='mx-auto'
                  type='circle'
                  src={
                    tasteList.cafeLogoImage
                      ? tasteList.cafeLogoImage
                      : logoCopickSquare
                  }
                  alt={tasteList.cafeName}
                />
                <Text className='mt-1.5 text-gray90 font-500 text-body'>
                  {tasteList.cafeName}
                </Text>
                <Text className='mt-1.5 text-gray80 text-caption'>
                  매장 위치 보러가기
                  <img className='inline w-4' src={right} />
                </Text>
              </RoundBox>
            </GridBox>
            {!beanId ? (
              <>
                <GridBox className='mt-12'>
                  <Text type='mainBodyTitle'>
                    <Span type='strong'>{tasteList.beanName}</Span>와
                  </Text>
                  <Text type='mainBodyTitle'>비슷한 원두도 있어요!</Text>
                  <GridBox type='mainRecommendSimmilar'>
                    {recommendFormdata.map((item) => (
                      <RoundBox
                        key={item.beanId}
                        type='mainRoundBox'
                        onClick={handleToClickBeans}
                        data={item.beanId}
                      >
                        <div className='w-20 mx-auto'>
                          <img
                            className='h-90px mx-auto'
                            src={
                              item.beanImage ? item.beanImage : coffee_default
                            }
                          />
                          <Text type='mainRedcommendSimmilar'>
                            {item.beanName}
                          </Text>
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
              </>
            ) : null}
          </article>
        </div>
        {!beanId ? <KakaoShare /> : null}
      </main>
    </>
  );
};

export default MainYesTasteSurvey;
