import { RoundBox, Text } from '../../components/atoms';
import { coffee_default } from '../../assets/images';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configureStore';
import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/configureStore';
import { getBeansListType } from '../../redux/modules/beans';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { right } from '../../assets/icons';
import { useNavigate } from 'react-router-dom';

const MainMidCarousel = () => {
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  const { beanlist } = useSelector((state: RootState) => state.beans);

  useEffect(() => {
    appDispatch(getBeansListType(1));
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

  const handleToTasteSurvey = () => {
    navigate('/survey/main');
  };

  return (
    <>
      <div className='flex mt-5'>
        <button className='bg-brownS02 mr-2 text-white rounded-xl px-2.5 py-[3px] font-700 text-body'>
          블렌드
        </button>
        <button className='bg-white mr-2 border text-brownS02 rounded-xl px-2.5 py-[3px] text-body'>
          싱글 오리진
        </button>
      </div>
      <div className='flex'>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          effect={'cards'}
          grabCursor={true}
          slidesPerView={2}
          spaceBetween={80}
          className='mySwiper px-7 py-7'
        >
          {beansByTypeFormdata.map((item) => (
            <SwiperSlide key={item.beanId}>
              <RoundBox type='mainRoundBox' className='w-40'>
                <div className='mx-auto h-[180px] select-none flex flex-col justify-center'>
                  <img
                    className='h-90px mx-auto'
                    src={item.beanImage ? item.beanImage : coffee_default}
                    alt={item.beanName}
                  />
                  <Text type='mainRedcommendSimmilar'>{item.beanName}</Text>
                </div>
              </RoundBox>
            </SwiperSlide>
          ))}
          <SwiperSlide>
            <RoundBox type='mainRoundBox' className='bg-brownS01bg w-48'>
              <div className='mr-0 h-[180px] select-none text-center flex flex-col justify-evenly '>
                <Text className='text-gray80'>
                  나에게 맞는 원두가 <br />
                  궁금하다면?
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
    </>
  );
};

export default MainMidCarousel;
