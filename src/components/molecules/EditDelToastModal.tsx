import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/configureStore';
import { axiosDeletePost } from '../../redux/modules/posts';

interface postsIdType {
  postsId: number;
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
    appDispatch(axiosDeletePost(postsId));
  };
  return (
    <div>
      <div className=' w-80 h-80 bg-gray-300 absolute flex flex-col justify-around'>
        <button
          onClick={() => {
            handleMoveToEditPage(props.postsId);
          }}
        >
          수정 하시겠습니까?
        </button>
        <button
          onClick={() => {
            handleDeletePost(props.postsId);
          }}
        >
          삭제 하시겠습니까?
        </button>
      </div>
    </div>
  );
};

export default EditDelToastModal;
