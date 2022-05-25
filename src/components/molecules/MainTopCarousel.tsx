import { Swiper, SwiperSlide } from 'swiper/react';
import { cardImg01, cardImg02, cardImg03 } from '../../assets/images';
import { EffectCards } from 'swiper';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// Import Swiper styles
import 'swiper/css';

const MainTopCarousel = () => {
  return (
    <>
      <div className=' h-[340px]'>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          effect={'cards'}
          grabCursor={true}
          autoplay={true}
          spaceBetween={-80}
          className='mySwiper h-full w-full px-7 pb-7'
        >
          <SwiperSlide className=''>
            <div className='w-[220px] h-[314px]'>
              <img
                className='h-full rounded-[32px] shadow-contents'
                src={cardImg01}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='w-[220px] h-[314px]'>
              <img
                className='h-full rounded-[32px] shadow-contents'
                src={cardImg02}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='w-[220px] h-[314px]'>
              <img
                className='h-full rounded-[32px] shadow-contents'
                src={cardImg03}
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default MainTopCarousel;
