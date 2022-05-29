import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../redux/configureStore';
import { InfinityScroll } from '../../components/atoms/index';
import { EditDelToastModal } from '../../components/molecules/index';
import {
  addLikeDB,
  deleteLikeDB,
  getPostListDB,
} from '../../redux/modules/posts';
import { heart, heart_full, edit } from '../../assets/icons';
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
        <div className='font-500 m-5 text-[22px]'>커뮤니티</div>
        {!user.isLogin ? (
          <></>
        ) : (
          <button
            className='bg-white shadow-lg rounded-full w-10 h-10 flex justify-center items-center fixed right-6'
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
                className='bg-white w-full cursor-pointer mb-3 shadow-lg rounded-30px transition hover:bg-brownS03 active:bg-brownS03 ease-in'
                key={idx}
                onClick={() => {
                  handleMoveToDetailPage(post.postsId!);
                }}
              >
                <div className='flex justify-between p-1'>
                  <div className='flex items-center mb-4'>
                    <div className='h-14 w-14 rounded-full bg-brownS03 mr-4 text-center leading-[56px] text-[28px]'>
                      {post.nickname?.substring(0, 1).toUpperCase()}
                    </div>
                    <span>{post.nickname}</span>
                  </div>
                  {user.nickname === post.nickname ? (
                    <button
                      className='p-4'
                      onClick={() => {
                        getSetToastFrom(post.postsId!);
                      }}
                    >
                      ···
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
                <img
                  className='w-full h-80 object-cover'
                  src={
                    post.postsImage
                      ? post.postsImage.toString()
                      : 'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814052__340.png'
                  }
                />
                <div className='p-4'>
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

                  <span>
                    {post.likesCount !== null ? post.likesCount : '0'}개
                  </span>
                </div>
              </div>
            );
          })}
          {toggle && <EditDelToastModal postsId={clickedPostId} />}
        </InfinityScroll>
      </div>
    </div>
  );
};

export default PostList;
