import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/configureStore';
import { deletePostDB } from '../../redux/modules/posts';
import { Button, Text, RoundBox, ToastPopupBox } from '../atoms';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configureStore';
import { setModalToggle } from '../../redux/modules/modalToggle';

interface postsIdType {
  postsId: number;
  fromList?: boolean;
  fromMyPostEdit?: boolean;
}

const EditDelToastModal = (props: postsIdType) => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();

  // 커뮤니티 수정페이지로 이동
  const handleMoveToEditPage = (postsId: number) => {
    navigate(`/posts/write/${postsId}`);
  };
  // 커뮤니티 글 삭제
  const handleDeletePost = (postsId: number) => {
    appDispatch(deletePostDB(postsId));
    // 커뮤니티 게시물 목록페이지인 경우
    if (props.fromList) {
      navigate('/posts');
    } else if (props.fromMyPostEdit) {
      return;
    }
    navigate(-1);
  };

  const toggle = useSelector(
    (store: RootState) => store.modatToggle.modalToggle
  );

  const handleClosePopup = () => {
    appDispatch(setModalToggle(!toggle));
  };
  return (
    <>
      <div
        className='fixed z-10 touch-none top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.3)]'
        onClick={handleClosePopup}
      >
        <ToastPopupBox
          type='default'
          cross
          className='flex flex-col pb-24 mt-80 animate-scrollUp'
        >
          <Text className='text-subH33 font-500'>어떤 작업을 하시겠어요?</Text>
          <Button
            className='text-white font-500 text-body'
            type='bgBrownP'
            onClick={() => {
              handleMoveToEditPage(props.postsId);
            }}
          >
            수정하기
          </Button>
          <Button
            className='mt-4 text-gray-400 shadow-lg'
            type='bg-gray60'
            onClick={() => {
              handleDeletePost(props.postsId);
            }}
          >
            삭제하기
          </Button>
        </ToastPopupBox>
      </div>
    </>
  );
};

export default EditDelToastModal;
