import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/configureStore';
import { getPostListDB } from '../../redux/modules/posts';
import { useAppDispatch } from '../../redux/configureStore';
import { InfinityScroll } from '../../components/atoms/index';
import { EditDelToastModal } from '../../components/molecules/index';
import { addLikeDB } from '../../redux/modules/posts';
import { deleteLikeDB } from '../../redux/modules/posts';

const PostList = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  // 토스트팝업 토글용 state
  const [toastStatus, setToastStatus] = useState(false);
  // ...클릭시 해당 게시물의 postsId 저장
  const [clickedPostId, setClickedPostId] = useState(0);

  // db에서 커뮤니티 리스트 가져오기
  useEffect(() => {
    // if (list.length < 2) {}
    !isListLoaded && appDispatch(getPostListDB(0));
  }, []);

  // 커뮤니티 리스트, 로딩
  const { list, isLoading, isListLoaded } = useSelector(
    (store: RootState) => store.posts
  );
  // 페이징 넘버, db에서받아온 post수
  const { paging, postsLoadedLen } = useSelector(
    (store: RootState) => store.posts
  );
  console.log(isListLoaded);
  // 토스트팝업 띄우기
  const getSetToastFrom = (postsId: number) => {
    setToastStatus(!toastStatus);
    setClickedPostId(postsId);
  };

  // 커뮤니티 작성페이지로 이동
  const handleMoveToWritePage = () => {
    navigate('/posts/write');
  };
  // 커뮤니티 상세페이지로 이동
  const handleMoveToDetailPage = (postsId: number) => {
    navigate(`/posts/${postsId}`);
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
      <div className='m-5'>커뮤니티</div>
      <div className='flex flex-col pb-24'>
        <InfinityScroll
          callNext={() => {
            appDispatch(getPostListDB(paging!));
          }}
          loading={isLoading!}
          isNext={postsLoadedLen === 4 ? true : false}
        >
          {list.map((post, idx) => {
            return (
              <div
                className='bg-white w-full mb-3 shadow-lg rounded-30px'
                key={idx}
              >
                <div className='flex justify-between p-1'>
                  <div className='flex items-center mb-4'>
                    <img
                      className='h-12 w-12 rounded-full mr-4'
                      src='https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg'
                    />
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
                <div className='p-4'>
                  {post.isLikes === null ? (
                    <button
                      onClick={() => {
                        handleAddLikes(post.postsId!);
                      }}
                    >
                      🤍
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleDeleteLikes(post.postsId!);
                      }}
                    >
                      ❤️
                    </button>
                  )}

                  <span>{post.likesCount}개</span>
                </div>
              </div>
            );
          })}
          {toastStatus && <EditDelToastModal postsId={clickedPostId} />}
        </InfinityScroll>
      </div>

      <button
        className='text-[24px] bg-white shadow-lg h-10 w-10 rounded-full fixed top-3 right-6'
        onClick={handleMoveToWritePage}
      >
        +
      </button>
    </div>
  );
};

export default PostList;
