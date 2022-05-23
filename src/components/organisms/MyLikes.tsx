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

  console.log(listLiked);

  return (
    <div>
      {listLiked.map((post, index) => {
        return <div key={index}>{post.title}</div>;
      })}
    </div>
  );
};

export default MyLikes;
