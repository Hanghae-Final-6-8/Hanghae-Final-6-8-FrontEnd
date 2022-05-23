import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/configureStore';
import { RootState } from '../../redux/configureStore';
import { getPostsLikedDB } from '../../redux/modules/mypage';

const MyLikes = () => {
  const appDispatch = useAppDispatch();
  useEffect(() => {
    !isListLikedLoaded && appDispatch(getPostsLikedDB());
  }, []);

  const { listLiked, isListLikedLoaded } = useSelector(
    (store: RootState) => store.mypage
  );

  return (
    <div className='flex flex-wrap pb-24'>
      {listLiked.map((post, index) => {
        return (
          <div className='ml-1 mr-1' key={index}>
            <img
              className='w-24'
              src={
                post.postsImage
                  ? post.postsImage.toString()
                  : 'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814052__340.png'
              }
            />
          </div>
        );
      })}
    </div>
  );
};

export default MyLikes;
