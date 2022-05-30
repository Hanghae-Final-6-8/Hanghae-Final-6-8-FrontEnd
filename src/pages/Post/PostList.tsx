import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../redux/configureStore';
import { InfinityScroll, Text } from '../../components/atoms';
import { EditDelToastModal } from '../../components/molecules/index';
import {
  addLikeDB,
  deleteLikeDB,
  getPostListDB,
} from '../../redux/modules/posts';
import { heart, heart_full, edit, more } from '../../assets/icons';
import { setModalToggle } from '../../redux/modules/modalToggle';

const PostList = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const { state }: any = useLocation();

  // 토스트팝업 토글용 state
  const toggle = useSelector(
    (store: RootState) => store.modatToggle.modalToggle
  );
  // ...클릭시 해당 게시물의 postsId 저장
  const [clickedPostId, setClickedPostId] = useState(0);

  // db에서 커뮤니티 리스트 가져오기
  useEffect(() => {
    !isListLoaded && appDispatch(getPostListDB(0));
    if (state) {
      document
        .getElementsByClassName('infinityScroll')[0]
        .scrollTo(0, state.scrollyValue);
    }
  }, []);

  // 커뮤니티 리스트, 로딩
  const { list, isLoading, isListLoaded } = useSelector(
    (store: RootState) => store.posts
  );
  // 페이징 넘버, db에서받아온 post수
  const { paging, postsLoadedLen } = useSelector(
    (store: RootState) => store.posts
  );

  const user = useSelector((state: RootState) => state.user);

  // 토스트팝업 띄우기
  const getSetToastFrom = (postsId: number) => {
    appDispatch(setModalToggle(!toggle));
    setClickedPostId(postsId);
  };

  // 커뮤니티 작성페이지로 이동
  const handleMoveToWritePage = () => {
    navigate('/posts/write');
  };
  // 커뮤니티 상세페이지로 이동
  const handleMoveToDetailPage = (postsId: number) => {
    const scrolly =
      document.getElementsByClassName('infinityScroll')[0].scrollTop;

    navigate(`/posts/${postsId}`, { state: { scrolly } });
  };

  // 좋아요 추가
  const handleAddLikes = (postsId: number) => {
    appDispatch(addLikeDB(postsId));
  };
  // 좋아요 삭제
  const handleDeleteLikes = (postsId: number) => {
    appDispatch(deleteLikeDB(postsId));
  };

  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='font-500 text-head mb-9'>커뮤니티</div>
        {!user.isLogin ? (
          <></>
        ) : (
          <button
            className='bg-white shadow-lg rounded-full w-10 h-10 flex justify-center items-center fixed top-12 right-6 z-10'
            onClick={handleMoveToWritePage}
          >
            <img src={edit} />
          </button>
        )}
      </div>

      <div className='flex flex-col pb-24'>
        <InfinityScroll
          callNext={() => {
            appDispatch(getPostListDB(paging!));
          }}
          loading={isLoading!}
          isNext={postsLoadedLen === 20 ? true : false}
        >
          {list.map((post, idx) => {
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
                    {user.nickname === post.nickname ? (
                      <button
                        className='p-4'
                        onClick={(e) => {
                          e.stopPropagation();
                          getSetToastFrom(post.postsId!);
                        }}
                      >
                        <img className='absolute right-[19px]' src={more} />
                      </button>
                    ) : null}
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
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddLikes(post.postsId!);
                      }}
                    >
                      <img src={heart} />
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteLikes(post.postsId!);
                      }}
                    >
                      <img src={heart_full} />
                    </button>
                  )}

                  <p>{post.likesCount !== null ? post.likesCount : '0'}개</p>
                  <Text className='absolute text-caption right-6'>
                    더 보기...
                  </Text>
                </div>
              </div>
            );
          })}
          {toggle && (
            <EditDelToastModal postsId={clickedPostId} location={true} />
          )}
        </InfinityScroll>
      </div>
    </div>
  );
};

export default PostList;
