import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/configureStore';
import { axiosGetPostList } from '../../redux/modules/posts';
import { useAppDispatch } from '../../redux/configureStore';
import { InfinityScroll } from '../../components/atoms/index';
import { EditDelToastModal } from '../../components/molecules/index';

const PostList = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  // 토스트팝업 토글용 state
  const [toastStatus, setToastStatus] = useState(false);
  // ...클릭시 해당 게시물의 postsId 저장
  const [clickedPostId, setClickedPostId] = useState(0);

  // db에서 커뮤니티 리스트 가져오기
  useEffect(() => {
    if (list.length < 2) {
      appDispatch(axiosGetPostList(0));
    }
  }, []);

  // 커뮤니티 리스트, 로딩
  const { list, isLoading } = useSelector((store: RootState) => store.posts);
  // 페이징 넘버, db에서받아온 post수
  const { paging, postsLoadedLen } = useSelector(
    (store: RootState) => store.posts
  );

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

  const handleGetPostList = () => {
    appDispatch(axiosGetPostList(paging!));
  };

  return (
    <div>
      <div className='m-5'>커뮤니티</div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        <InfinityScroll
          callNext={() => {
            appDispatch(axiosGetPostList(paging!));
          }}
          loading={isLoading!}
          isNext={postsLoadedLen === 4 ? true : false}
        >
          {list.map((post, idx) => {
            console.log(post.postsImage);
            return (
              <div className='w-full h-80' key={idx}>
                <div className='flex justify-between p-1'>
                  <div className='flex items-center'>
                    <img
                      className='h-14 w-14 mr-2 rounded-full'
                      src='https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg'
                    />
                    <span>{post.nickname}</span>
                  </div>
                  <button
                    onClick={() => {
                      getSetToastFrom(post.postsId!);
                    }}
                  >
                    ···
                  </button>
                </div>
                <img
                  src={
                    post.postsImage
                      ? post.postsImage.toString()
                      : 'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814052__340.png'
                  }
                  onClick={() => {
                    handleMoveToDetailPage(post.postsId!);
                  }}
                />
                {post.isLikes === null ? (
                  <button>🤍</button>
                ) : (
                  <button>❤️</button>
                )}

                <span>{post.likesCount}개</span>
              </div>
            );
          })}
          {toastStatus && <EditDelToastModal postsId={clickedPostId} />}
        </InfinityScroll>
      </div>

      <button
        style={{
          fontSize: '3rem',
          backgroundColor: 'pink',
          height: '3rem',
          width: '3rem',
          lineHeight: '3rem',
          borderRadius: '100%',
          textAlign: 'center',
          boxSizing: 'border-box',
          position: 'fixed',
          top: 5,
          right: 5,
        }}
        onClick={handleMoveToWritePage}
      >
        +
      </button>
      <button
        style={{ position: 'fixed', top: 55, right: 5 }}
        onClick={handleGetPostList}
      >
        추가로드
      </button>
    </div>
  );
};

export default PostList;
