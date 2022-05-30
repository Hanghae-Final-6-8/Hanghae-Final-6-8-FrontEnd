import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Text } from '../../components/atoms';
import { MyPostEdit, MyCommentEdit } from '../../components/organisms';
import { left } from '../../assets/icons';

const EditMyActivity = () => {
  const navigate = useNavigate();
  const { tabNum } = useParams();

  const [toggleValue, setToggleValue] = useState<number>(
    tabNum ? Number(tabNum) : 0
  );

  const handleToFacorites = () => {
    setToggleValue(0);
  };
  const handleToMyLikes = () => {
    setToggleValue(1);
  };

  const handleBacktoPrev = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className='relative text-center mb-3'>
        <button
          className='absolute top-0 h-8 w-8 block'
          onClick={handleBacktoPrev}
        >
          <img src={left} className='w-full' />
        </button>
        <Text className='text-sub font-500'>내 활동</Text>
      </div>

      <div className='tabs flex justify-around w-full h-full pb-6'>
        <div className='cursor-pointer' onClick={handleToFacorites}>
          <Text
            className='text-[16px] block h-full leading-[46px]'
            type={toggleValue === 0 ? 'beansNavClicked' : 'beansNav'}
          >
            게시글
          </Text>
        </div>
        <div className='cursor-pointer' onClick={handleToMyLikes}>
          <Text
            className='text-[16px] block h-full leading-[46px]'
            type={toggleValue === 1 ? 'beansNavClicked' : 'beansNav'}
          >
            댓글
          </Text>
        </div>
      </div>
      <div>
        {toggleValue === 0 ? (
          <MyPostEdit />
        ) : toggleValue === 1 ? (
          <MyCommentEdit />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default EditMyActivity;
