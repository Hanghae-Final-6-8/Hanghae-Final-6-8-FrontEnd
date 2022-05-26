import { PrevBtn, Text } from '../../components/atoms';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configureStore';
import { logoCopickSquare } from '../../assets/logo';
import { camera } from '../../assets/icons';
import { useState } from 'react';

const EditProfile = () => {
  const user = useSelector((state: RootState) => state.user);
  const [inputNickname, setInputNickname] = useState(user.nickname);

  const handleEditProfileImg = () => {
    alert('프로필 수정');
  };

  const handleInputValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputNickname(e.target.value);
  };

  return (
    <>
      <div className='relative flex justify-between items-center'>
        <PrevBtn className='relative' />
        <Text className='font-500 text-head'>프로필 수정</Text>
        <Text className='text-sub2 text-brownS02 cursor-pointer'>저장</Text>
      </div>
      <div className='w-100px h-100px mx-auto mt-6 relative'>
        <img
          className='overflow-hidden w-full h-full rounded-full'
          src={user.profile_url ? user.profile_url : logoCopickSquare}
          alt={user.nickname}
        />
        <div
          className='h-8 w-8 rounded-full absolute bottom-0 right-0  bg-brownP bg-cover overflow-hidden flex cursor-pointer'
          onClick={handleEditProfileImg}
        >
          <img
            className='filter-gray30 mx-auto w-5'
            src={camera}
            alt='프로필 수정'
          />
        </div>
      </div>
      <div className='mt-6 relative'>
        <Text className='text-caption'>닉네임</Text>
        <input
          className='w-full border-b pb-2 mt-2 focus:outline-none'
          placeholder='닉네임을 입력해주세요'
          value={inputNickname}
          onChange={handleInputValue}
          maxLength={10}
        />
        <div className='absolute right-0 bottom-2 text-gray60 text-body'>
          {inputNickname.length < 11 ? `${inputNickname.length}/10` : '10/10'}
        </div>
      </div>
    </>
  );
};

export default EditProfile;
