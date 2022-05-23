import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/configureStore';
import { RootState } from '../../redux/configureStore';
import { getPostsLikedDB } from '../../redux/modules/posts';

const MyLikes = () => {
  const appDispatch = useAppDispatch();
  useEffect(() => {
    appDispatch(getPostsLikedDB());
  }, []);

  const postListLiked = useSelector((store: RootState) => store.posts.list);

  console.log(postListLiked);

  return <div>좋아요 커뮤니티 리스트</div>;
};

export default MyLikes;
