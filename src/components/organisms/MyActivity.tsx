import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/configureStore';
import { RootState } from '../../redux/configureStore';
import { getPostListMine } from '../../redux/modules/mypage';
import { getMyCommentDB } from '../../redux/modules/mypage';
import { useNavigate } from 'react-router-dom';
import { right } from '../../assets/icons';
import { RoundBox, Text, Button } from '../atoms';
import { commentActionCreators } from '../../redux/modules/comment';

const MyActivity = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  useEffect(() => {
    !isListMyActivityLoaded && appDispatch(getPostListMine());
    !isMyCommentListLoaded && appDispatch(getMyCommentDB());
  }, []);

  const {
    listMyActivity,
    isListMyActivityLoaded,
    myCommentList,
    isMyCommentListLoaded,
  } = useSelector((store: RootState) => store.mypage);

  const [toggle, setToggle] = useState(false);
  const [commentsId, setCommentsId] = useState(0);

  // 커뮤니티 상세페이지로 이동
  const handleMoveToDetailPage = (postsId: number) => {
    navigate(`/posts/${postsId}`);
  };

  const handleMoveToEditActivityPage = (tabNum: number) => {
    navigate(`/mypage/activity/${tabNum}`);
  };

  const handleToggle = (commentsId: number) => {
    setToggle(!toggle);
    setCommentsId(commentsId);
  };

  const handleDeleteComment = () => {
    appDispatch(commentActionCreators.deleteCommentDB(commentsId));
  };

  return (
    <div>
      <div className='flex flex-col'>
        <div
          className='flex justify-between cursor-pointer'
          onClick={() => {
            handleMoveToEditActivityPage(0);
          }}
        >
          <div className='mt-6 mb-6'>내가 작성한 글</div>
          <button>
            <img src={right} />
          </button>
        </div>

        {listMyActivity.map((post, index) => {
          return (
            <div
              className='m-2 flex'
              key={index}
              onClick={() => {
                handleMoveToDetailPage(post.postsId!);
              }}
            >
              <img
                className='w-24'
                src={
                  post.postsImage
                    ? post.postsImage.toString()
                    : 'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814052__340.png'
                }
              />
              <div>
                <p>{post.content}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className='flex flex-col pb-24'>
        <div
          className='flex justify-between cursor-pointer'
          onClick={() => {
            handleMoveToEditActivityPage(1);
          }}
        >
          <div className='mt-6 mb-6'>내가 작성한 댓글</div>
          <button>
            <img src={right} />
          </button>
        </div>
        {myCommentList.map((comment, index) => {
          return (
            <div className='m-2 flex' key={index}>
              <div className='flex justify-between w-full'>
                <p>{comment.content}</p>
                <button
                  onClick={() => {
                    handleToggle(comment.commentsId);
                  }}
                >
                  더보기
                </button>
              </div>
            </div>
          );
        })}
        {toggle === true ? (
          <div className='fixed z-10 touch-none top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.3)]'>
            <RoundBox round='mainModal' className='flex flex-col pb-36 mt-80'>
              <Text className='text-subH33 font-500'>
                어떤 작업을 하시겠어요?
              </Text>
              <Button
                className='text-white font-500 text-body'
                type='brownPType'
                onClick={handleDeleteComment}
              >
                삭제하기
              </Button>
              <Button
                className='mt-4 text-gray-400 shadow-lg'
                type='bg-gray60'
                onClick={handleToggle}
              >
                닫기
              </Button>
            </RoundBox>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MyActivity;
