import { RoundBox, Text } from '../atoms';
import { coffee_default } from '../../assets/images';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configureStore';
import { useAppDispatch } from '../../redux/configureStore';
import { getFavoriteList } from '../../redux/modules/favorite';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookmark_full } from '../../assets/icons';

const MyFavorites = () => {
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  const { beanlist } = useSelector((state: RootState) => state.favorite);

  useEffect(() => {
    appDispatch(getFavoriteList());
  }, []);

  const beansFavoriteFormdata: {
    beanId: number;
    beanName: string;
    description: string;
    type: number;
    beanImage: string;
  }[] = [];
  beanlist.forEach((el) => {
    beansFavoriteFormdata.push(el);
  });

  const handleToBeansDetail = (e: {
    currentTarget: { getAttribute: (arg0: string) => void };
  }) => {
    const currentTargetValue = Number(
      e.currentTarget.getAttribute('data-beanid')
    );
    navigate(`/beans/${currentTargetValue}`);
  };

  return (
    <div className='pb-28 grid grid-cols-2'>
      {beansFavoriteFormdata.map((item) => (
        <RoundBox
          key={item.beanId}
          type='mainRoundBox'
          className='w-40 mb-2.5 hover:bg-brownS03 transition active:bg-brownS03 ease-in'
          onClick={handleToBeansDetail}
          data={item.beanId}
        >
          <img className='absolute top-4 right-4' src={bookmark_full} />
          <div className='mx-auto h-[180px] select-none flex flex-col justify-center'>
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
  );
};

export default MyFavorites;
