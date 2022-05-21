import { useNavigate, useLocation } from 'react-router-dom';
import { Text, GridBox, RoundBox } from '../../components/atoms';
import { RootState, useAppDispatch } from '../../redux/configureStore';
import { useEffect, useState } from 'react';
import { getBeansList } from '../../redux/modules/beans';
import { useSelector } from 'react-redux';
import { search } from '../../assets/icons';
import { logoCopickSquare } from '../../assets/logo';

const BeansList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const appDispatch = useAppDispatch();
  const beans = useSelector((state: RootState) => state.beans);
  const [inputValue, setInputValue] = useState('');

  const handleInputValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setInputValue('');
  };

  const beansFormdata = [
    {
      bean_id: 1,
      bean_name: '파이크 플레이스 로스트',
      bean_description: '코코아와 구운 견과류의 은은한 향',
      type: 1,
    },
    {
      bean_id: 2,
      bean_name: '파이크 플레이스 로스트',
      bean_description: '코코아와 구운 견과류의 은은한 향',
      type: 1,
    },
    {
      bean_id: 3,
      bean_name: '파이크 플레이스 로스트',
      bean_description: '코코아와 구운 견과류의 은은한 향',
      type: 1,
    },
    {
      bean_id: 4,
      bean_name: '파이크 플레이스 로스트',
      bean_description: '코코아와 구운 견과류의 은은한 향',
      type: 1,
    },
    {
      bean_id: 5,
      bean_name: '파이크 플레이스 로스트',
      bean_description: '코코아와 구운 견과류의 은은한 향',
      type: 1,
    },
    {
      bean_id: 6,
      bean_name: '파이크 플레이스 로스트',
      bean_description: '코코아와 구운 견과류의 은은한 향',
      type: 1,
    },
    {
      bean_id: 7,
      bean_name: '파이크 플레이스 로스트',
      bean_description: '코코아와 구운 견과류의 은은한 향',
      type: 1,
    },
    {
      bean_id: 8,
      bean_name: '파이크 플레이스 로스트',
      bean_description: '코코아와 구운 견과류의 은은한 향',
      type: 1,
    },
    {
      bean_id: 9,
      bean_name: '파이크 플레이스 로스트',
      bean_description: '코코아와 구운 견과류의 은은한 향',
      type: 1,
    },
  ];

  useEffect(() => {
    !beans.isLoaded && appDispatch(getBeansList());
  }, [appDispatch]);

  const handleToSearch = () => {
    navigate('./search');
  };

  const handleToCafe = () => {
    navigate('./cafe');
  };
  return (
    <>
      <div className='font-500 text-head'>원두 종류</div>
      <div className='flex justify-around mt-6 h-[46px] text-center cursor-pointer items-center mb-5 border-b border-gray20'>
        <div className=' w-full h-full' onClick={handleToSearch}>
          <Text
            className='block h-full leading-[46px]'
            type={
              location.pathname === '/beans/search'
                ? 'beansNavClicked'
                : 'beansNav'
            }
          >
            원두 검색
          </Text>
        </div>
        <div className='w-full h-full' onClick={handleToCafe}>
          <Text
            className='block h-full leading-[46px]'
            type={
              location.pathname === '/beans/cafe'
                ? 'beansNavClicked'
                : 'beansNav'
            }
          >
            카페
          </Text>
        </div>
      </div>

      <form className='relative' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder=' 당신의 원두를 찾아보세요...'
          className='w-full bg-brownP h-[43px] bg-transparent text-white placeholder-inherit rounded-full px-5'
          value={inputValue}
          onChange={handleInputValue}
        />
        <button type='submit' className='absolute right-4 top-2'>
          <img
            style={{
              filter:
                'invert(94%) sepia(100%) saturate(0%) hue-rotate(240deg) brightness(108%) contrast(101%)',
            }}
            src={search}
          />
        </button>
      </form>
      <GridBox className='gap-2.5 mt-5 pb-32' type='flexBasic'>
        {beansFormdata.map((item) => (
          <RoundBox
            key={item.bean_id}
            className='flex items-center'
            type='beansRoundBox'
          >
            <div className='mr-7 rounded-full overflow-hidden w-16'>
              <img src={logoCopickSquare} />
            </div>
            <div className=''>
              <Text className='text-gray90 text-body'>{item.bean_name}</Text>
              <Text className='line-clamp-1 text-caption text-gray80'>
                {item.bean_description}
              </Text>
            </div>
          </RoundBox>
        ))}
      </GridBox>
    </>
  );
};

export default BeansList;
