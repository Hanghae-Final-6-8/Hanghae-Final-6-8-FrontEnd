import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configureStore';
import { useNavigate } from 'react-router-dom';
import { postActionCreators } from '../../redux/modules/posts';
import { useAppDispatch } from '../../redux/configureStore';
import { EditDelToastModal } from '../../components/molecules/index';
import { mypageActionCreators } from '../../redux/modules/mypage';
import { heart, heart_full } from '../../assets/icons';
import { setModalToggle } from '../../redux/modules/modalToggle';

const MyPostEdit = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  useEffect(() => {
    !isListLikedLoaded && appDispatch(mypageActionCreators.getPostListMine());
  }, []);

  const { listMyActivity, isListLikedLoaded } = useSelector(
    (store: RootState) => store.mypage
  );

  // 토스트팝업 토글용 state
  const toggle = useSelector(
    (store: RootState) => store.modatToggle.modalToggle
  );
  // ...클릭시 해당 게시물의 postsId 저장
  const [clickedPostId, setClickedPostId] = useState(0);

  // 토스트팝업 띄우기
  const getSetToastFrom = (postsId: number) => {
    appDispatch(setModalToggle(!toggle));
    setClickedPostId(postsId);
  };

  // 커뮤니티 상세페이지로 이동
  const handleMoveToDetailPage = (postsId: number) => {
    navigate(`/posts/${postsId}`);
  };

  return (
    <div className='pb-24'>
      {listMyActivity.map((post, idx) => {
        return (
          <div
            className='bg-white w-full mb-3 shadow-lg rounded-30px'
            key={idx}
          >
            <div className='flex justify-between p-1'>
              <div className='flex items-center mb-4'>
                <div className='h-14 w-14 rounded-full bg-brownS03 mr-4 text-center leading-[56px] text-[28px]'>
                  {post.nickname?.substring(0, 1).toUpperCase()}
                </div>
                <span>{post.nickname}</span>
              </div>
              <button
                className='p-4'
                onClick={() => {
                  getSetToastFrom(post.postsId!);
                }}
              >
                ···
              </button>
            </div>
            <img
              className='w-full'
              src={
                post.postsImage
                  ? post.postsImage.toString()
                  : 'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814052__340.png'
              }
              onClick={() => {
                handleMoveToDetailPage(post.postsId!);
              }}
            />
            <div className='p-4 flex items-center'>
              {post.isLikes === null ? (
                <button>
                  <img src={heart} />
                </button>
              ) : (
                <button>
                  <img src={heart_full} />
                </button>
              )}

              <span>{post.likesCount !== null ? post.likesCount : '0'}개</span>
            </div>
          </div>
        );
      })}
      {toggle && <EditDelToastModal postsId={clickedPostId} />}
    </div>
  );
};

export default MyPostEdit;
