import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/configureStore';
import { axiosGetPostList } from '../../redux/modules/posts';
import { useAppDispatch } from '../../redux/configureStore';
import postsSlice from '../../redux/modules/posts';

const PostList = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  // 토스트팝업 토글용 state
  const [toastStatus, setToastStatus] = useState(false);
  // ...클릭시 해당 게시물의 postsId 저장용 state
  const [clickedPostId, setClickedPostId] = useState(0);
  // 리덕스에서 커뮤니티 리스트 가져옴
  const postList = useSelector((store: RootState) => store.posts.list);
  // api로 db에서 커뮤니티 리스트 가져오기
  useEffect(() => {
    appDispatch(axiosGetPostList());
  }, []);

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
  // 커뮤니티 수정페이지로 이동
  const handleMoveToEditPage = (postsId: number) => {
    navigate(`/posts/write/${postsId}`);
  };
  // 커뮤니티 글 삭제
  const handleDeletePost = (postsId: number) => {
    appDispatch(postsSlice.actions.deletePost(postsId));
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
        {postList.map((post, idx) => {
          return (
            <div key={idx}>
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
                    getSetToastFrom(post.postsId);
                  }}
                >
                  ···
                </button>
              </div>

              {/* <span>{post.tagName}</span> */}
              {post.tagName.length !== 0 ? (
                post.tagName.map((tag, index) => {
                  return (
                    <span
                      className='inline-block bg-lime-800 text-white mr-1 rounded-md text-sm font-bold p-1'
                      key={index}
                    >
                      {tag}
                    </span>
                  );
                })
              ) : (
                <></>
              )}
              <img
                src={post.postsImage}
                className='rounded-md mr-2'
                onClick={() => {
                  handleMoveToDetailPage(post.postsId);
                }}
              />
              {toastStatus && (
                <div>
                  <div className=' w-80 h-80 bg-gray-300 absolute flex flex-col justify-around'>
                    <button
                      onClick={() => {
                        handleMoveToEditPage(clickedPostId);
                      }}
                    >
                      수정 하시겠습니까?
                    </button>
                    <button
                      onClick={() => {
                        handleDeletePost(clickedPostId);
                      }}
                    >
                      삭제 하시겠습니까?
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
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
    </div>
  );
};

export default PostList;
