import { right } from '../../assets/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configureStore';
import { logoCopickSquare } from '../../assets/logo';
import { Text } from '../atoms';
import { useNavigate } from 'react-router-dom';

const MypageHeader = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const handleToEditProfile = () => {
    navigate('./profile');
  };

  return (
    <div className='flex justify-between mb-5'>
      <div className='flex'>
        <div className='bg-brownS02 w-12 h-12 rounded-full mr-3 text-center leading-10 overflow-hidden'>
          <img src={user.profile_url ? user.profile_url : logoCopickSquare} />
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

      <button>
        <img src={right} />
      </button>
    </div>
  );
};

export default MypageHeader;
