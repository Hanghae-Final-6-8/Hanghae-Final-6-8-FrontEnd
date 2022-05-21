import { useNavigate } from 'react-router-dom';
import { Text, GridBox, RoundBox } from '../../components/atoms';
import { RootState, useAppDispatch } from '../../redux/configureStore';
import { useEffect, useState } from 'react';
import { getBeansList } from '../../redux/modules/beans';
import { useSelector } from 'react-redux';

import { BeansCafeBtn, BeansSearchForm } from '../../components/molecules';
import { coffee_default } from '../../assets/images';

const BeansList = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const beans = useSelector((state: RootState) => state.beans);
  const [clickedSearchBtn, setClickedSearchBtn] = useState(true);

  const beansFormdata: {
    beanId: number;
    beanName: null;
    description: null;
    type: number;
    beanImage: null;
  }[] = [];
  beans.beanlist.forEach((el) => {
    beansFormdata.push(el);
  });

  useEffect(() => {
    !beans.isLoaded && appDispatch(getBeansList());
  }, [appDispatch]);

  const handleToSearchBtn = () => {
    setClickedSearchBtn(true);
  };

  const handleToCafeBtn = () => {
    setClickedSearchBtn(false);
  };

  const handleToBeansDetail = () => {
    navigate('/');
  };
  return (
    <>
      <div className='font-500 text-head'>원두 종류</div>
      <div className='flex justify-around mt-6 h-[46px] text-center cursor-pointer items-center mb-5 border-b border-gray20'>
        <div className=' w-full h-full' onClick={handleToSearchBtn}>
          <Text
            className='block h-full leading-[46px]'
            type={clickedSearchBtn ? 'beansNavClicked' : 'beansNav'}
          >
            원두 검색
          </Text>
        </div>
        <div className='w-full h-full' onClick={handleToCafeBtn}>
          <Text
            className='block h-full leading-[46px]'
            type={!clickedSearchBtn ? 'beansNavClicked' : 'beansNav'}
          >
            카페
          </Text>
        </div>
      </div>
      {clickedSearchBtn ? <BeansSearchForm /> : <BeansCafeBtn />}

      <GridBox className='gap-2.5 mt-5 pb-32' type='flexBasic'>
        {beansFormdata.map((item) => (
          <RoundBox
            key={item.beanId}
            className='items-center flex'
            type='beansRoundBox'
            onClick={handleToBeansDetail}
          >
            <div className='shrink-0 mr-7  w-16 h-16'>
              <img
                className='h-16 mx-auto'
                src={item.beanImage ? item.beanImage : coffee_default}
              />
            </div>
            <div>
              <Text className='text-gray90 text-body'>{item.beanName}</Text>
              <Text className='line-clamp-1 text-caption text-gray80'>
                {item.description}
              </Text>
            </div>
          </RoundBox>
        ))}
      </GridBox>
    </>
  );
};

export default BeansList;
