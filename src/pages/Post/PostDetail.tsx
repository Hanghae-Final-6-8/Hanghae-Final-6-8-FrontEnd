import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configureStore';
import Comment from '../../components/molecules/Comment';
import { useState } from 'react';
import { useAppDispatch } from '../../redux/configureStore';
import commentSlice from '../../redux/modules/comment';
import Likes from '../../components/atoms/Likes';
import { useNavigate } from 'react-router-dom';

const PostDetail = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  // postsId는 App.tsx에서 라우팅 할때 정한 파라미터명이다.
  const postsId = useParams().postsId;
  // 리덕스에서 커뮤니티 리스트 가져옴
  const postList = useSelector((store: RootState) => store.posts.list);
  // 커뮤니티 리스트중에서 url 파라미터와 같은 커뮤니티 담음
  const post = postList.find((post) => {
    // url 파라미터는 string으로 넘어와서 형변환 해줘야한다.
    return post.postsId === Number(postsId);
  });

  // 코멘트 state
  const [comment, setComment] = useState<string>('');
  // 코멘트 state에 값넣기
  const getInputCommentFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
  // 코멘트 추가
  const handleAddComment = (postsId: number) => {
    appDispatch(commentSlice.actions.addComment({ postsId, comment }));
  };

  const handleBacktoPrev = () => {
    navigate(-1);
  };

  return (
    <div>
      <button className='m-2 block' onClick={handleBacktoPrev}>
        ◀
      </button>
      <span>{post?.nickname}</span>
      <span>{post?.createdAt}</span>
      {post?.tagName.length !== 0 ? (
        post?.tagName.map((tag, idx) => {
          return (
            <span
              className='inline-block bg-lime-800 text-white mr-1 rounded-md text-sm font-bold p-1'
              key={idx}
            >
              {tag}
            </span>
          );
        })
      ) : (
        <></>
      )}
      <p>{post?.title}</p>
      <img src={post?.postsImage} />
      <Likes postsId={Number(postsId)} />
      <p>{post?.content}</p>
      <hr />
      <input
        type='text'
        placeholder='댓글 내용을 입력해주세요'
        onChange={getInputCommentFrom}
      />
      <button
        onClick={() => {
          handleAddComment(Number(postsId));
        }}
      >
        등록
      </button>
      <Comment postsId={Number(postsId)} />
    </div>
  );
};

export default PostDetail;
