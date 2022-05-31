import { useState } from 'react';
import { RootState } from '../../redux/configureStore';
import { changeMypageTabsNum } from '../../redux/modules/mypage';
import { useAppDispatch } from '../../redux/configureStore';
import { useSelector } from 'react-redux';
import { Text } from '../atoms';
import { MyFavorites } from '../organisms';
import { MyLikes } from '../organisms';
import { MyActivity } from '../organisms';

const MypageTabs = () => {
  const appDispatch = useAppDispatch();
  const tabNum = useSelector((store: RootState) => store.mypage.mypageTabsNum);

  const handleTabNumber = (tabNumber: number) => {
    appDispatch(changeMypageTabsNum(tabNumber));
  };

  return (
    <div>
      <div className='tabs flex justify-around w-full h-full pb-6'>
        <div
          className='cursor-pointer'
          onClick={() => {
            handleTabNumber(0);
          }}
        >
          <Text
            className='block h-full leading-[46px]'
            type={tabNum === 0 ? 'beansNavClicked' : 'beansNav'}
          >
            즐겨찾기
          </Text>
        </div>
        <div
          className='cursor-pointer'
          onClick={() => {
            handleTabNumber(1);
          }}
        >
          <Text
            className='block h-full leading-[46px]'
            type={tabNum === 1 ? 'beansNavClicked' : 'beansNav'}
          >
            좋아요
          </Text>
        </div>
        <div
          className='cursor-pointer'
          onClick={() => {
            handleTabNumber(2);
          }}
        >
          <Text
            className='block h-full leading-[46px]'
            type={tabNum === 2 ? 'beansNavClicked' : 'beansNav'}
          >
            내활동
          </Text>
        </div>
      </div>
      <div>
        {tabNum === 0 ? (
          <MyFavorites />
        ) : tabNum === 1 ? (
          <MyLikes />
        ) : tabNum === 2 ? (
          <MyActivity />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MypageTabs;
