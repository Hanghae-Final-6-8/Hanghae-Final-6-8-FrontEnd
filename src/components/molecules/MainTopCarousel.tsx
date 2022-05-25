import { Swiper, SwiperSlide } from 'swiper/react';
import { cardImg01, cardImg02, cardImg03 } from '../../assets/images';

// Import Swiper styles
import 'swiper/css';

const MainTopCarousel = () => {
  return (
    <>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        className='mySwiper w-[220px] h-[320px]'
      >
        <SwiperSlide className='bg-cardImg01 bg-no-repeat rounded-[32px] '>
          {/*  */}
        </SwiperSlide>
        <SwiperSlide className='bg-cardImg02 bg-no-repeat rounded-[32px] '>
          {/*  */}
        </SwiperSlide>
        <SwiperSlide className='bg-cardImg03 bg-no-repeat rounded-[32px] '>
          {/*  */}
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default MainTopCarousel;
