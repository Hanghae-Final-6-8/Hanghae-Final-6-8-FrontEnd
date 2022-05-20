import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Text } from '../../components/atoms';

const BeansList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSearch, setIsSearch] = useState(true);

  const handleToSearch = () => {
    navigate('./search');
    setIsSearch(true);
  };

  const handleToCafe = () => {
    navigate('./cafe');
    setIsSearch(false);
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
                type={isSearch ? 'beansNavClicked' : 'beansNav'}
              >
                원두 검색
              </Text>
            </div>
            <div className='w-full h-full' onClick={handleToCafe}>
              <Text
                className='block h-full leading-[46px]'
                type={isSearch ? 'beansNav' : 'beansNavClicked'}
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
