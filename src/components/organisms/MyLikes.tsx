import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/configureStore';
import { RootState } from '../../redux/configureStore';
import { getPostsLikedDB } from '../../redux/modules/mypage';
import { useNavigate } from 'react-router-dom';

const MyLikes = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  useEffect(() => {
    appDispatch(getPostsLikedDB());
  }, []);

  const { listLiked } = useSelector((store: RootState) => store.mypage);

  // 커뮤니티 상세페이지로 이동
  const handleMoveToDetailPage = (postsId: number) => {
    navigate(`/posts/${postsId}`);
  };

  return (
    <div className='grid grid-cols-3 gap-0.5 pb-24'>
      {listLiked.map((post, index) => {
        return (
          <div className='relative cursor-pointer' key={index}>
            <img
              className='w-full h-28 object-cover'
              src={
                post.postsImage
                  ? post.postsImage.toString()
                  : 'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814052__340.png'
              }
              onClick={() => {
                handleMoveToDetailPage(post.postsId!);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MyLikes;
