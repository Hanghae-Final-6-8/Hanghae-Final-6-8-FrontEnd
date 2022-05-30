import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configureStore';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/configureStore';
import { EditDelToastModal } from '../../components/molecules/index';
import { mypageActionCreators } from '../../redux/modules/mypage';
import { heart, heart_full, more } from '../../assets/icons';
import { setModalToggle } from '../../redux/modules/modalToggle';
import { Text } from '../atoms';

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
            className='bg-white w-full cursor-pointer mb-3 shadow-contents rounded-30px pt-5 transition hover:scale-[1.02] active:scale-[1.02] ease-in'
            key={idx}
            onClick={() => {
              handleMoveToDetailPage(post.postsId!);
            }}
          >
            <div className='relative flex justify-between p-1'>
              <div className='flex items-center mb-4'>
                <div className='relative h-12 w-12 ml-[19px] rounded-full  bg-brownS03 mr-3.5 text-center leading-[48px] text-head'>
                  {post.nickname?.substring(0, 1).toUpperCase()}
                </div>
                <div>
                  <Text type='mainSubTitle'>{post.nickname}</Text>
                  <Text className='mt-0' type='caption'>
                    {post?.modifiedAt}
                  </Text>
                </div>
                <button
                  className='p-4'
                  onClick={(e) => {
                    e.stopPropagation();
                    getSetToastFrom(post.postsId!);
                  }}
                >
                  <img className='absolute right-[19px]' src={more} />
                </button>
              </div>
            </div>
            <img
              className='w-full h-80 object-cover'
              src={
                post.postsImage
                  ? post.postsImage.toString()
                  : 'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814052__340.png'
              }
            />
            <div className='relative p-4 flex gap-1 text-caption leading-6'>
              {post.isLikes === null ? (
                <button>
                  <img src={heart} />
                </button>
              ) : (
                <button>
                  <img src={heart_full} />
                </button>
              )}

              <p>{post.likesCount !== null ? post.likesCount : '0'}개</p>
              <Text className='absolute text-caption right-6'>더 보기...</Text>
            </div>
          </div>
        );
      })}
      {toggle && <EditDelToastModal postsId={clickedPostId} />}
    </div>
  );
};

export default MyPostEdit;
