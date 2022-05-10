import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/configureStore';
import { axiosGetCommunityList } from '../redux/modules/community';
import { useAppDispatch } from '../redux/configureStore';

const Community = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  // 리덕스에서 커뮤니티 리스트 가져옴
  const postList = useSelector((store: RootState) => store.community.list);
  // api로 db에서 커뮤니티 리스트 가져오기
  useEffect(() => {
    appDispatch(axiosGetCommunityList());
  }, []);
  // 커뮤니티 작성페이지로 이동
  const handleMoveToWritePage = () => {
    navigate('/community/write');
  };
  // 커뮤니티 상세페이지로 이동
  const handleMoveToDetailPage = (postsId: number) => {
    navigate(`/community/${postsId}`);
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
              <img
                className='h-14 w-14 rounded-full'
                src='https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg'
              />
              <span>{post.nickname}</span>
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
                className='h-40 w-40 rounded-md mr-2'
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

export default Community;
