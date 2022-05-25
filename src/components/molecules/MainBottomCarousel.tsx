import { RoundBox, Text, Image } from '../atoms';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/configureStore';
import { RootState } from '../../redux/configureStore';
import { getBeansListByCafeMain } from '../../redux/modules/cafe';

const MainBottomCarousel = () => {
  const appDispatch = useAppDispatch();
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

  return (
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
  );
};

export default MainBottomCarousel;
