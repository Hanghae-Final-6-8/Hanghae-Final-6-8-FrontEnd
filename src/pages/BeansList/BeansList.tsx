import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Text } from '../../components/atoms';
import { RootState, useAppDispatch } from '../../redux/configureStore';
import { useEffect } from 'react';
import { getBeansList } from '../../redux/modules/beans';
import { useSelector } from 'react-redux';

const BeansList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const appDispatch = useAppDispatch();
  const beans = useSelector((state: RootState) => state.beans);

  useEffect(() => {
    !beans.isLoaded && appDispatch(getBeansList());
  }, [appDispatch]);

  console.log(beans.beanlist);

  const handleToSearch = () => {
    navigate('./search');
  };

  const handleToCafe = () => {
    navigate('./cafe');
  };
  return (
    <>
      {location.pathname === '/beans/search' ||
      location.pathname === '/beans/cafe' ? (
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
        </>
      ) : null}

      <Outlet />
    </>
  );
};

export default BeansList;
