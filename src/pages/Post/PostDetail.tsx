import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/configureStore';
import { useEffect, useState } from 'react';
import { addCommentDB } from '../../redux/modules/comment';
import { Likes, Text } from '../../components/atoms';
import postsSlice, { getPostDB } from '../../redux/modules/posts';
import { left, more } from '../../assets/icons';
import {
  SpinnerSuspense,
  EditDelToastModal,
  Comment,
} from '../../components/molecules';
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
  // 엔터키 경우 추가
  const onKeydown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (comment.length !== 0 && e.key === 'Enter') {
      appDispatch(
        addCommentDB({ posts_id: Number(postsId), content: comment })
      );
      setComment('');
    }
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
        <div className='pb-24 relative'>
          <div className='relative text-center'>
            <button
              className='absolute top-0 h-8 w-8 block'
              onClick={handleBacktoPrev}
            >
              <img src={left} className='w-full' />
            </button>
            <Text className='text-sub font-500'>게시글</Text>
          </div>
          <div className='bg-white w-full mb-3 shadow-contents rounded-30px'>
            <div className='flex justify-between mt-9 items-center'>
              <div className='flex items-center mb-4'>
                <div className='relative h-12 w-12 ml-[19px] rounded-full  bg-brownS03 mr-3.5 text-center leading-[48px] text-head'>
                  {post?.nickname?.substring(0, 1).toUpperCase()}
                </div>
                <div>
                  <Text type='mainSubTitle'>{post?.nickname}</Text>
                  <Text className='mt-0' type='caption'>
                    {post?.modifiedAt}
                  </Text>
                </div>
                {user.nickname === post!.nickname ? (
                  <button
                    onClick={() => {
                      getSetToastFrom(post!.postsId!);
                    }}
                  >
                    <img className='absolute right-[19px]' src={more} />
                  </button>
                ) : null}
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
            <div className='px-5'>
              <p className='text-body font-500'>{post?.content}</p>
              {post?.tagName.length !== 0
                ? post?.tagName.map((tag, idx) => {
                    return (
                      <span
                        className='inline-block bg-orange-100 text-brownS02 font-500 text-caption mt-4 mb-4 mr-1 rounded-full text-sm font-bold px-2 py-1 cursor-default'
                        key={idx}
                      >
                        {tag}
                      </span>
                    );
                  })
                : null}
            </div>
            <hr className='mb-4' />
            <div className='px-5'>
              <Comment postsId={Number(postsId)} />
              {toggle && <EditDelToastModal postsId={clickedPostId} />}
            </div>
          </div>
          <div className='fixed bg-white bottom-0 left-0 w-full h-[90px'>
            <div className='shadow-toolbar flex px-6'>
              <input
                className='text-body py-3 px-6 pr-50px mt-5 mb-[21px] w-full outline-none rounded-full shadow-contents'
                type='text'
                maxLength={120}
                placeholder={`${user.nickname}(으)로 댓글 달기...`}
                onChange={getInputCommentFrom}
                value={comment}
                onKeyDown={onKeydown}
              />
              <div className='flex justify-center items-center'>
                <button
                  className='absolute right-[44px] text-body rounded-xl text-gray80 '
                  onClick={handleAddComment}
                >
                  게시
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetail;
