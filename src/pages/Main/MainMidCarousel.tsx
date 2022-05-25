import { RoundBox, Text } from '../../components/atoms';
import { coffee_default } from '../../assets/images';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configureStore';
import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/configureStore';
import { getBeansListType } from '../../redux/modules/beans';

const MainMidCarousel = () => {
  const appDispatch = useAppDispatch();
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
  console.log(beansByTypeFormdata);

  return (
    <>
      <div className='flex mt-[14px]'>
        {beansByTypeFormdata.map((item) => (
          <RoundBox type='mainRoundBox' className='w-40' key={item.beanId}>
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
    </>
  );
};

export default MainMidCarousel;
