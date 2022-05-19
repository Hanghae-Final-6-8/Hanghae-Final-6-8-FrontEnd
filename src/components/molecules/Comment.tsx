import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configureStore';
import { useAppDispatch } from '../../redux/configureStore';
import { useEffect } from 'react';
import { commentActionCreators } from '../../redux/modules/comment';

// 부모 컴포넌트로부터 받아오는 props의 타입 지정
interface postsIdProps {
  postsId: number;
}

const Comment = (props: postsIdProps) => {
  const appDispatch = useAppDispatch();
  // 커뮤니티(포스트) 아이디를 props로 받아옴
  const postsId = props.postsId;

  // 댓글 비동기로 불러와서 리덕스에 주입
  useEffect(() => {
    appDispatch(commentActionCreators.axiosGetCommentList(postsId));
  }, []);

  // 코멘트 리스트 리덕스에서 불러오기
  const commentList = useSelector((store: RootState) => store.comment.list);
  const postComentList = commentList.filter((comment) => {
    return comment.postsId === Number(postsId);
  });

  //임시. 로그인 구현시 삭제
  const nickname = 'test1';

  // 댓글 삭제
  const handleDeleteComment = (commentsId: number) => {
    appDispatch(commentActionCreators.axiosDeleteComment(commentsId));
  };
  return (
    <div className='flex flex-col'>
      {postComentList.map((comment, index) => {
        return (
          <div key={index}>
            <img
              className='h-14 w-14 rounded-full'
              src='https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg'
            />
            <span>{comment.nickname}</span>
            <p>{comment.content}</p>
            <span>01-02 13:24</span>
            {comment.nickname === nickname && (
              <button
                onClick={() => {
                  handleDeleteComment(comment.commentsId);
                }}
              >
                삭제
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Comment;
