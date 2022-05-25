import { RoundBox, Text, Image } from '../atoms';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/configureStore';
import { RootState } from '../../redux/configureStore';
import { getBeansListByCafeMain } from '../../redux/modules/cafe';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { right } from '../../assets/icons';
import { useNavigate } from 'react-router-dom';

const MainBottomCarousel = () => {
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  const { cafeListMain, isMainLoaded } = useSelector(
    (state: RootState) => state.cafe
  );
  useEffect(() => {
    !isMainLoaded && appDispatch(getBeansListByCafeMain());
  }, [appDispatch]);

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

  const handleToTasteSurvey = () => {
    navigate('/survey/main');
  };

  return (
    <div className='mt-5'>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        effect={'cards'}
        grabCursor={true}
        slidesPerView={2}
        spaceBetween={250}
        className='mySwiper'
      >
        {beansNumByCafeFormdata.map((item) => (
          <SwiperSlide key={item.cafeId}>
            <RoundBox
              className={`relative items-center flex w-[280px] bg-slate-500 overflow-hidden h-[110px] select-none`}
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
          </SwiperSlide>
        ))}
        <SwiperSlide>
          <RoundBox
            className={`relative items-center flex w-[280px] bg-brownS01bg overflow-hidden h-[110px] select-none`}
            type='main2RoundBox'
          >
            <div className='z-10 flex gap-8'>
              <Text className='text-gray80'>
                더 많은 브랜드의 <br />
                원두 정보를 알고 싶다면?
              </Text>
              <button
                className='mx-auto w-10 h-10 rounded-full bg-white'
                onClick={handleToTasteSurvey}
              >
                <img className='mx-auto' src={right} />
              </button>
            </div>
          </RoundBox>
        </SwiperSlide>
        <SwiperSlide>{/*  */}</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MainBottomCarousel;
