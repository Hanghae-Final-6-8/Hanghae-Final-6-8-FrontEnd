import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configureStore';
// import likesSlice from '../../redux/modules/likes';
import { useAppDispatch } from '../../redux/configureStore';
import { likeActionCreators } from '../../redux/modules/likes';
import { LikesItemDataParams } from '../../redux/modules/likes';
import { addLikeDB } from '../../redux/modules/posts';

interface likesProps {
  postsId: number;
}

const Likes = (props: likesProps) => {
  // 포스트 아이디
  const postsId = props.postsId;
  const appDispatch = useAppDispatch();
  // db에서 좋아요 불러오기

  const postList = useSelector((store: RootState) => store.posts.list);
  const _post = postList.find((p) => {
    return p.postsId === postsId;
  });

  // 좋아요 리스트 가져옴
  const likesList = useSelector((store: RootState) => store.likes.list);

  const postLikesList = likesList.filter((like) => {
    return like.postsId === postsId;
  });

  let userLiked: LikesItemDataParams | undefined = undefined;
  // 임시
  const userNickname = 'test2';

  if (postLikesList.length !== 0) {
    userLiked = postLikesList.find((like) => {
      return like.nickname === userNickname;
    });
  }

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
    appDispatch(
      // likesSlice.actions.deleteLikes(userLiked ? userLiked.likesId : 0)
      likeActionCreators.axiosDeleteLike(postsId)
    );
  };
  return (
    <div>
      {_post?.isLikes === null ? (
        <button onClick={handleAddLikes}>🤍</button>
      ) : (
        <button onClick={handleDeleteLikes}>❤️</button>
      )}

      <span>좋아요 {postLikesList.length}개</span>
    </div>
  );
};

export default Likes;
