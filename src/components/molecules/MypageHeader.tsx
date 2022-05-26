import { right } from '../../assets/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configureStore';
import { logoCopickSquare } from '../../assets/logo';
import { Text } from '../atoms';
import { useNavigate } from 'react-router-dom';
import MypageToastPopup from './MypageToastPopup';
import { useState } from 'react';

const MypageHeader = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const handleToEditProfile = () => {
    navigate('./profile');
  };

  const [isActivePopup, setIsActivePopup] = useState(false);
  const handleClosePopup = () => {
    setIsActivePopup(false);
  };
  const handleIsActivePopup = () => {
    setIsActivePopup(true);
  };

  return (
    <>
      <div className='flex justify-between mb-5'>
        <div className='flex'>
          <div className='bg-white w-12 h-12 rounded-full mr-3 text-center leading-10 overflow-hidden'>
            <img
              className='w-full h-full'
              src={user.profile_url ? user.profile_url : logoCopickSquare}
              alt={'프로필 이미지'}
            />
          </div>
          <div className='flex flex-col'>
            <Text type='mainSubTitle'>{user.nickname}</Text>
            <Text
              className='mt-0 underline underline-offset-1 cursor-pointer text-gray60 text-caption'
              onClick={handleToEditProfile}
            >
              내 정보 수정하기
            </Text>
          </div>
        </div>

        <button onClick={handleIsActivePopup}>
          <img src={right} />
        </button>
      </div>
      {isActivePopup ? <MypageToastPopup onClick={handleClosePopup} /> : null}
    </>
  );
};

export default MypageHeader;
