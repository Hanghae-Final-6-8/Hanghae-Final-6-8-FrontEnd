import { useEffect } from 'react';
import { likeActionCreators } from '../../redux/modules/mypage';
import { useAppDispatch } from '../../redux/configureStore';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configureStore';
import { Text } from '../atoms';

const MypageOverviewActivity = () => {
  const appDispatch = useAppDispatch();
  useEffect(() => {
    appDispatch(likeActionCreators.getUserInfo());
  }, []);
  const userInfo = useSelector((store: RootState) => store.mypage);

  return (
    <div className='pt-6 pb-6 pl-10 pr-10 shadow-lg rounded-30px'>
      <div className='flex flex-col m-5'>
        <div className='flex justify-between'>
          <div className='flex flex-col items-center'>
            <div>{userInfo.favorite}</div>
            <Text className='text-[12px] text-gray-300' type='beansNav caption'>
              즐겨찾기
            </Text>
          </div>
          <div className='flex flex-col items-center'>
            <div>{userInfo.likes}</div>
            <Text className='text-[12px] text-gray-300' type='beansNav caption'>
              좋아요
            </Text>
          </div>
          <div className='flex flex-col items-center'>
            <div>{userInfo.activity}</div>
            <Text className='text-[12px] text-gray-300' type='beansNav caption'>
              내 활동
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MypageOverviewActivity;
