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
    appDispatch(commentActionCreators.getCommentListDB(postsId));
  }, []);

  // 코멘트 리스트 리덕스에서 불러오기
  const commentList = useSelector((store: RootState) => store.comment.list);
  // const postComentList = commentList.filter((comment) => {
  //   return comment.postsId === Number(postsId);
  // });
  const user = useSelector((state: RootState) => state.user);

  // 댓글 삭제
  const handleDeleteComment = (commentsId: number) => {
    appDispatch(commentActionCreators.deleteCommentDB(commentsId));
  };
  return (
    <div className='flex flex-col'>
      {commentList.map((comment, index) => {
        return (
          <div key={index} className='flex items-center justify-between mb-3'>
            <div className='flex items-center'>
              <div className='h-14 w-14 rounded-full bg-brownS03 mr-4 text-center leading-[56px] text-[28px]'>
                {comment.nickname?.substring(0, 1).toUpperCase()}
              </div>

              <p>{comment.content}</p>
            </div>

            <span>{comment.createdAt}</span>
            {comment.nickname === user.nickname && (
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
