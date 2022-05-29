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
    <div className='flex flex-col text-body'>
      {commentList.map((comment, index) => {
        return (
          <div
            key={index}
            className='flex items-center relative justify-between py-5'
          >
            <p className='text-body font-700 text-gray90 mr-3'>
              {comment.nickname}
            </p>
            <div className='flex items-center'>
              <p className='w-48'>{comment.content}</p>
            </div>
            <span className='caption text-gray30'>{comment.createdAt}</span>
            {comment.nickname === user.nickname && (
              <button
                className='absolute text-caption right-3 text-red60 bottom-1'
                onClick={() => {
                  handleDeleteComment(comment.commentsId);
                }}
              >
                삭제
              </button>
            )}
            <div className='absolute w-full bottom-0 bg-gray20 h-px'>
              {/*  */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Comment;
