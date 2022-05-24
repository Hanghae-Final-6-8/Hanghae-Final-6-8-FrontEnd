import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configureStore';
import { useAppDispatch } from '../../redux/configureStore';
import { addLikeDB } from '../../redux/modules/posts';
import { deleteLikeDB } from '../../redux/modules/posts';
import { heart, heart_full } from '../../assets/icons';
// import { useEffect } from 'react';
// import likesSlice from '../../redux/modules/likes';
// import { likeActionCreators } from '../../redux/modules/likes';
// import { LikesItemDataParams } from '../../redux/modules/likes';

interface likesProps {
  postsId: number;
}

const Likes = (props: likesProps) => {
  // 포스트 아이디
  const postsId = props.postsId;
  const appDispatch = useAppDispatch();

  const postList = useSelector((store: RootState) => store.posts.list);
  const post = postList.find((p) => {
    return p.postsId === postsId;
  });

  // // 좋아요 리스트 가져옴
  // const likesList = useSelector((store: RootState) => store.likes.list);

  // const postLikesList = likesList.filter((like) => {
  //   return like.postsId === postsId;
  // });

  // let userLiked: LikesItemDataParams | undefined = undefined;
  // // 임시
  // const userNickname = 'test2';

  // if (postLikesList.length !== 0) {
  //   userLiked = postLikesList.find((like) => {
  //     return like.nickname === userNickname;
  //   });
  // }

  // let userObj: LikesItemDataParams | undefined = undefined;
  // if (userLiked) {
  //   userObj = postLikesList.find((like) => {
  //     return like.nickname === userNickname;
  //   });
  // }

  // 좋아요 추가
  const handleAddLikes = () => {
    appDispatch(addLikeDB(postsId));
  };
  // 좋아요 삭제
  const handleDeleteLikes = () => {
    appDispatch(deleteLikeDB(postsId));
  };
  return (
    <div>
      {post?.isLikes === null ? (
        <button onClick={handleAddLikes}>
          <img src={heart} />
        </button>
      ) : (
        <button onClick={handleDeleteLikes}>
          <img src={heart_full} />
        </button>
      )}

      <span>좋아요 {post?.likesCount}개</span>
    </div>
  );
};

export default Likes;
