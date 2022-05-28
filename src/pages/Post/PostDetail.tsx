import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configureStore';
import Comment from '../../components/molecules/Comment';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/configureStore';
import { addCommentDB } from '../../redux/modules/comment';
import { getPostDB } from '../../redux/modules/posts';
import Likes from '../../components/atoms/Likes';
import postsSlice from '../../redux/modules/posts';
import { left } from '../../assets/icons';
import { SpinnerSuspense } from '../../components/molecules';

const PostDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const scrolly: any = location.state ? location.state : null;
  const scrollyValue = scrolly !== null ? scrolly.scrolly : null;

  const appDispatch = useAppDispatch();
  // postsId는 App.tsx에서 라우팅 할때 정한 파라미터명이다.
  const postsId = useParams().postsId;

  // 포스트 디테일 가져오기
  useEffect(() => {
    appDispatch(postsSlice.actions.isLoading(true));
    appDispatch(getPostDB(Number(postsId)));
  }, []);
  const { post, isLoading } = useSelector((store: RootState) => store.posts);
  // 코멘트 state
  const [comment, setComment] = useState<string>('');
  // 코멘트 state에 값넣기
  const getInputCommentFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
  // 코멘트 추가
  const handleAddComment = () => {
    if (comment === '') {
      alert('댓글을 입력해 주세요');
      return;
    }
    appDispatch(addCommentDB({ posts_id: Number(postsId), content: comment }));
    setComment('');
  };

  const handleBacktoPrev = () => {
    scrolly !== null
      ? navigate('/posts', { state: { scrollyValue } })
      : navigate(-1);
  };

  return (
    <>
      {isLoading ? (
        <SpinnerSuspense />
      ) : (
        <div className='pb-24'>
          <button className='m-2 p-2 block' onClick={handleBacktoPrev}>
            <img src={left} />
          </button>
          <div className='flex items-center'>
            <div className='h-14 w-14 rounded-full bg-brownS03 mr-4 text-center leading-[56px] text-[28px] mb-3'>
              {post?.nickname?.substring(0, 1)}
            </div>
            <div className='flex flex-col'>
              <span>{post?.nickname}</span>
              <span className='text-[12px] text-gray-500'>
                {post?.createdAt}
              </span>
            </div>
          </div>

          <img
            className='w-full'
            src={
              post?.postsImage
                ? post.postsImage.toString()
                : 'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814052__340.png'
            }
          />
          <Likes postsId={Number(postsId)} />
          <p>{post?.title}</p>
          <p>{post?.content}</p>
          {post?.tagName.length !== 0 ? (
            post?.tagName.map((tag, idx) => {
              return (
                <span
                  className='inline-block bg-orange-100 text-amber-800 mt-4 mb-4 mr-1 rounded-md text-sm font-bold p-1'
                  key={idx}
                >
                  {tag}
                </span>
              );
            })
          ) : (
            <></>
          )}
          <hr className='mb-4' />
          <div className='fixed bottom-0 left-0 z-[100] w-full'>
            <input
              className='w-[70%] p-8 text-[14px] outline-none'
              type='text'
              placeholder='댓글 내용을 입력해주세요'
              onChange={getInputCommentFrom}
              value={comment}
            />
            <button
              className='w-[30%] p-8 text-[14px] bg-white'
              onClick={handleAddComment}
            >
              게시
            </button>
          </div>

          <Comment postsId={Number(postsId)} />
        </div>
      )}
    </>
  );
};

export default PostDetail;
