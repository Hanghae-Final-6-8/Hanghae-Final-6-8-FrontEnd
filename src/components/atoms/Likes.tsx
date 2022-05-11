import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configureStore';
import likesSlice from '../../redux/modules/likes';
import { useAppDispatch } from '../../redux/configureStore';

interface likesProps {
  postsId: number;
}

const Likes = (props: likesProps) => {
  // 포스트 아이디
  const postsId = props.postsId;
  const appDispatch = useAppDispatch();
  // 좋아요 리스트 가져옴
  const likesList = useSelector((store: RootState) => store.likes.list);

  // 포스트아이디와 같은 좋아요 리스트만 가져옴(API연결한다면 애초에 백단에서 해당 포스트관련 좋아요 리스트만 가져올수있음)
  const postLikesList = likesList.filter((like) => {
    return like.postsId === postsId;
  });

  // 로그인 한 유저가 해당 게시물의 좋아요 눌렀는지 판단
  let userLiked = false;
  // 임시. 나중에 세션이나 쿠키에서 유저 id정보 가져올 것.
  const userNickname = 'test2';
  // 만약 해당게시물의 좋아요가 1 이상이면, 좋아요 리스트를 돌면서 로그인 한 유저의 아이디와 같은 것이 있는지 true / false를 반환. 있으면 true(좋아요했다는 것)
  if (postLikesList.length !== 0) {
    userLiked = postLikesList.some((like) => {
      return like.nickname === userNickname;
    });
  }

  let userObj: any = {};
  if (userLiked) {
    userObj = postLikesList.find((like) => {
      return like.nickname === userNickname;
    });
  }

  // 좋아요 추가
  const handleAddLikes = () => {
    const userNickname = 'test2';
    appDispatch(
      likesSlice.actions.addLikes({ postsId, nickname: userNickname })
    );
  };
  // 좋아요 삭제
  const handleDeleteLikes = () => {
    appDispatch(likesSlice.actions.deleteLikes(userObj.likesId));
  };
  return (
    <div>
      {!userLiked ? (
        <button onClick={handleAddLikes}>🤍</button>
      ) : (
        <button onClick={handleDeleteLikes}>❤️</button>
      )}

      <span>좋아요 {postLikesList.length}개</span>
    </div>
  );
};

export default Likes;
