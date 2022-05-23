import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configureStore';
import Comment from '../../components/molecules/Comment';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/configureStore';
import { addCommentDB } from '../../redux/modules/comment';
import { getPostDB } from '../../redux/modules/posts';
import Likes from '../../components/atoms/Likes';
import { useNavigate } from 'react-router-dom';

const PostDetail = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  // postsId는 App.tsx에서 라우팅 할때 정한 파라미터명이다.
  const postsId = useParams().postsId;
  // 리덕스에서 커뮤니티 리스트 가져옴
  const { list } = useSelector((store: RootState) => store.posts);
  // 커뮤니티 리스트중에서 url 파라미터와 같은 커뮤니티 담음
  const post = list.find((post) => {
    // url 파라미터는 string으로 넘어와서 형변환 해줘야한다.
    return post.postsId === Number(postsId);
  });
  // 포스트 디테일 가져오기
  useEffect(() => {
    appDispatch(getPostDB(Number(postsId)));
  }, []);

  // 코멘트 state
  const [comment, setComment] = useState<string>('');
  // 코멘트 state에 값넣기
  const getInputCommentFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
  // 코멘트 추가
  const handleAddComment = () => {
    appDispatch(addCommentDB({ posts_id: Number(postsId), content: comment }));
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

      <img src={post?.postsImage.toString()} />
      <Likes postsId={Number(postsId)} />
      <p>{post?.title}</p>
      <p>{post?.content}</p>
      {post?.tagName.length !== 0 ? (
        post?.tagName.map((tag, idx) => {
          return (
            <span
              className='inline-block bg-orange-100 text-amber-800 mr-1 rounded-md text-sm font-bold p-1'
              key={idx}
            >
              {tag}
            </span>
          );
        })
      ) : (
        <></>
      )}
      <hr />
      <input
        type='text'
        placeholder='댓글 내용을 입력해주세요'
        onChange={getInputCommentFrom}
      />
      <button onClick={handleAddComment}>등록</button>
      <Comment postsId={Number(postsId)} />
    </div>
  );
};

export default PostDetail;
