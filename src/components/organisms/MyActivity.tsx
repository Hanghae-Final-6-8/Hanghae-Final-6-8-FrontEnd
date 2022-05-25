import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/configureStore';
import { RootState } from '../../redux/configureStore';
import { getPostListMine } from '../../redux/modules/mypage';
import { getMyCommentDB } from '../../redux/modules/mypage';
import { useNavigate } from 'react-router-dom';

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

  // 커뮤니티 상세페이지로 이동
  const handleMoveToDetailPage = (postsId: number) => {
    navigate(`/posts/${postsId}`);
  };
  console.log(myCommentList);
  return (
    <div className='flex flex-col pb-24'>
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
  );
};

export default MyActivity;
