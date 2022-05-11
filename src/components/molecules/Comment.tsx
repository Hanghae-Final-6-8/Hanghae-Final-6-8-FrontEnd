import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configureStore';

// 부모 컴포넌트로부터 받아오는 props의 타입 지정
interface postsIdProps {
  postsId: number;
}

const Comment = (props: postsIdProps) => {
  // 커뮤니티(포스트) 아이디를 props로 받아옴
  const postsId = props.postsId;

  // 코멘트 리스트 불러오기
  const commentList = useSelector((store: RootState) => store.comment.list);
  const postComentList = commentList.filter((comment) => {
    return comment.postsId === Number(postsId);
  });

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
          </div>
        );
      })}
    </div>
  );
};

export default Comment;
