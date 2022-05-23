import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/configureStore';
import { deletePostDB } from '../../redux/modules/posts';
import { DarkWrapper, RoundBox } from '../atoms';
import { Button, Text } from '../atoms';

interface postsIdType {
  postsId: number;
}

const EditDelToastModal = (props: postsIdType) => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  console.log(props.postsId);
  // 커뮤니티 수정페이지로 이동
  const handleMoveToEditPage = (postsId: number) => {
    navigate(`/posts/write/${postsId}`);
  };
  // 커뮤니티 글 삭제
  const handleDeletePost = (postsId: number) => {
    appDispatch(deletePostDB(postsId));
  };

  const [isActivePopup, setIsActivePopup] = useState(true);

  const handleClosePopup = () => {
    setIsActivePopup(false);
  };
  const handleIsActivePopup = () => {
    setIsActivePopup(true);
  };

  return (
    <>
      {isActivePopup ? (
        <DarkWrapper data='mainModal' onClick={handleClosePopup}>
          <RoundBox round='mainModal' className='flex flex-col mt-96'>
            <Text className='text-subH33 font-500'>
              어떤 작업을 하시겠어요?
            </Text>
            <Button
              className='text-white font-500 text-body'
              type='brownPType'
              onClick={() => {
                handleMoveToEditPage(props.postsId);
              }}
            >
              수정하기
            </Button>
            <Button
              className='mt-4 text-gray60 shadow-contents'
              onClick={() => {
                handleDeletePost(props.postsId);
              }}
            >
              삭제하기
            </Button>
          </RoundBox>
        </DarkWrapper>
      ) : null}
    </>
  );
};

export default EditDelToastModal;
