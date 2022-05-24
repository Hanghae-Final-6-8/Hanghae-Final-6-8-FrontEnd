import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/configureStore';
import { RootState } from '../../redux/configureStore';
import { getPostsLikedDB } from '../../redux/modules/mypage';
import { useNavigate } from 'react-router-dom';
import { addLikeDB } from '../../redux/modules/posts';
import { deleteLikeDB } from '../../redux/modules/posts';

const MyLikes = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  useEffect(() => {
    !isListLikedLoaded && appDispatch(getPostsLikedDB());
  }, []);

  const { listLiked, isListLikedLoaded } = useSelector(
    (store: RootState) => store.mypage
  );

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
    <div className='flex flex-wrap pb-24'>
      {listLiked.map((post, index) => {
        return (
          <div className='mb-1 ml-1 mr-1 relative' key={index}>
            <img
              className='w-24'
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
              <button
                className='absolute top-1 right-1'
                onClick={() => {
                  handleAddLikes(post.postsId!);
                }}
              >
                🤍
              </button>
            ) : (
              <button
                className='absolute top-1 right-1'
                onClick={() => {
                  handleDeleteLikes(post.postsId!);
                }}
              >
                ❤️
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MyLikes;
