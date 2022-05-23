import { useState } from 'react';
import { Text } from '../atoms';
import { MyFavorites } from '../organisms';
import { MyLikes } from '../organisms';
import { MyActivity } from '../organisms';

const MypageTabs = () => {
  const [toggleValue, setToggleValue] = useState<number>(0);

  const handleToFacorites = () => {
    setToggleValue(0);
  };
  const handleToMyLikes = () => {
    setToggleValue(1);
  };
  const handleToMyActivity = () => {
    setToggleValue(2);
  };

  return (
    <div>
      <div className='tabs flex justify-around w-full h-full pb-6'>
        <div onClick={handleToFacorites}>
          <Text
            className='block h-full leading-[46px]'
            type={toggleValue === 0 ? 'beansNavClicked' : 'beansNav'}
          >
            즐겨찾기
          </Text>
        </div>
        <div onClick={handleToMyLikes}>
          <Text
            className='block h-full leading-[46px]'
            type={toggleValue === 1 ? 'beansNavClicked' : 'beansNav'}
          >
            좋아요
          </Text>
        </div>
        <div onClick={handleToMyActivity}>
          <Text
            className='block h-full leading-[46px]'
            type={toggleValue === 2 ? 'beansNavClicked' : 'beansNav'}
          >
            내활동
          </Text>
        </div>
      </div>
      <div>
        {toggleValue === 0 ? (
          <MyFavorites />
        ) : toggleValue === 1 ? (
          <MyLikes />
        ) : toggleValue === 2 ? (
          <MyActivity />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MypageTabs;
