import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configureStore';
import { useAppDispatch } from '../../redux/configureStore';
import { addLikeDB } from '../../redux/modules/posts';
import { deleteLikeDB } from '../../redux/modules/posts';
import { heart, heart_full } from '../../assets/icons';
import { setLikeCount } from '../../redux/modules/posts';
import { useEffect } from 'react';

interface likesProps {
  postsId: number;
  likeCount: number;
}

const Likes = (props: likesProps) => {
  // 포스트 아이디
  const postsId = props.postsId;
  const likeCount = props.likeCount;
  const appDispatch = useAppDispatch();

  useEffect(() => {
    appDispatch(setLikeCount(likeCount));
  }, []);

  const post = useSelector((store: RootState) => store.posts.post);

  // 좋아요 추가
  const handleAddLikes = () => {
    appDispatch(addLikeDB(postsId));
  };
  // 좋아요 삭제
  const handleDeleteLikes = () => {
    appDispatch(deleteLikeDB(postsId));
  };
  return (
    <div className='relative p-4 flex text-caption leading-6'>
      {post?.isLikes === null ? (
        <button onClick={handleAddLikes}>
          <img src={heart} />
        </button>
      ) : (
        <button onClick={handleDeleteLikes}>
          <img src={heart_full} />
        </button>
      )}

      <span className='ml-2'>{post?.likesCount ? post.likesCount : '0'}개</span>
    </div>
  );
};

export default Likes;
