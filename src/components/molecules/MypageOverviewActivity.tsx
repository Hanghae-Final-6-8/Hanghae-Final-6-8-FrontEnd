import { useEffect } from 'react';
import { likeActionCreators } from '../../redux/modules/mypage';
import { useAppDispatch } from '../../redux/configureStore';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configureStore';

const MypageOverviewActivity = () => {
  const appDispatch = useAppDispatch();
  useEffect(() => {
    appDispatch(likeActionCreators.getUserInfo());
  }, []);
  const userInfo = useSelector((store: RootState) => store.mypage);

  return (
    <div>
      <div className='flex flex-col m-5'>
        <div className='flex justify-around'>
          <div>즐겨찾기</div>
          <div>좋아요</div>
          <div>내 활동</div>
        </div>
        <div className='flex justify-around'>
          <div>{userInfo.favorite}</div>
          <div>{userInfo.likes}</div>
          <div>{userInfo.activity}</div>
        </div>
      </div>
    </div>
  );
};

export default MypageOverviewActivity;
