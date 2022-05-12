import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/configureStore';
import { axiosGetPostsList } from '../../redux/modules/posts';
import { useAppDispatch } from '../../redux/configureStore';

const PostList = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  // 토스트팝업 토글용 state
  const [toastStatus, setToastStatus] = useState(false);
  // 리덕스에서 커뮤니티 리스트 가져옴
  const postList = useSelector((store: RootState) => store.posts.list);
  // api로 db에서 커뮤니티 리스트 가져오기
  useEffect(() => {
    appDispatch(axiosGetPostsList());
  }, []);

  useEffect(() => {
    if (toastStatus) {
      setTimeout(() => setToastStatus(false), 1000);
    }
  }, [toastStatus]);

  const getSetToastFrom = () => {
    setToastStatus(true);
  };

  // 커뮤니티 작성페이지로 이동
  const handleMoveToWritePage = () => {
    navigate('/posts/write');
  };
  // 커뮤니티 상세페이지로 이동
  const handleMoveToDetailPage = (postsId: number) => {
    navigate(`/posts/${postsId}`);
  };

  return (
    <div>
      <div>커뮤니티</div>
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
                <button>...</button>
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
            </div>
          );
        })}
      </div>

      <button
        style={{
          fontSize: '5rem',
          backgroundColor: 'pink',
          height: '5rem',
          width: '5rem',
          lineHeight: '5rem',
          borderRadius: '100%',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
        onClick={handleMoveToWritePage}
      >
        +
      </button>
    </div>
  );
};

export default PostList;
