import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/configureStore';
import Comment from '../../components/molecules/Comment';
import { useEffect, useState } from 'react';
import { addCommentDB } from '../../redux/modules/comment';
import Likes from '../../components/atoms/Likes';
import postsSlice, { getPostDB } from '../../redux/modules/posts';
import { left } from '../../assets/icons';
import { SpinnerSuspense, EditDelToastModal } from '../../components/molecules';
import { setModalToggle } from '../../redux/modules/modalToggle';

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

  const user = useSelector((state: RootState) => state.user);

  // 토스트팝업 토글용 state
  const toggle = useSelector(
    (store: RootState) => store.modatToggle.modalToggle
  );

  // ...클릭시 해당 게시물의 postsId 저장
  const [clickedPostId, setClickedPostId] = useState(0);

  // 토스트팝업 띄우기
  const getSetToastFrom = (postsId: number) => {
    appDispatch(setModalToggle(!toggle));
    setClickedPostId(postsId);
  };

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
          <button
            className=' bg-white  rounded-full h-12 w-12 m-2 p-2 block transition hover:shadow-lg ease-in'
            onClick={handleBacktoPrev}
          >
            <img src={left} className='w-full' />
          </button>
          <div className='flex justify-between items-center'>
            <div>
              <div className='h-14 w-14 rounded-full bg-brownS03 mr-4 text-center leading-[56px] text-[28px] mb-3'>
                {post?.nickname?.substring(0, 1).toUpperCase()}
              </div>
              <div className='flex flex-col'>
                <span>{post?.nickname}</span>
                <span className='text-[12px] text-gray-500'>
                  {post?.createdAt}
                </span>
              </div>
            </div>

            {user.nickname === post!.nickname ? (
              <button
                className='p-4'
                onClick={() => {
                  getSetToastFrom(post!.postsId!);
                }}
              >
                ···
              </button>
            ) : (
              <></>
            )}
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
          {/* <p>{post?.title}</p> */}
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
          <div className='fixed bottom-0 left-0 w-full flex justify-between'>
            <input
              className='w-[70%] p-8 text-[18px] outline-none'
              type='text'
              maxLength={120}
              placeholder='댓글 내용을 입력해주세요'
              onChange={getInputCommentFrom}
              value={comment}
            />
            <div className='w-[30%] flex justify-center items-center'>
              <button
                className=' p-4 text-[18px] rounded-xl bg-white transition hover:shadow-md ease-in'
                onClick={handleAddComment}
              >
                게시
              </button>
            </div>
          </div>
          <Comment postsId={Number(postsId)} />
          {toggle && <EditDelToastModal postsId={clickedPostId} />}
        </div>
      )}
    </>
  );
};

export default PostDetail;
