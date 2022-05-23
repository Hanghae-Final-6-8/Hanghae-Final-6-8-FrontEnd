import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/configureStore';
import { RootState } from '../../redux/configureStore';
import { getPostListMine } from '../../redux/modules/mypage';

const MyActivity = () => {
  const appDispatch = useAppDispatch();
  useEffect(() => {
    !isListMyActivityLoaded && appDispatch(getPostListMine());
  }, []);

  const { listMyActivity, isListMyActivityLoaded } = useSelector(
    (store: RootState) => store.mypage
  );

  return (
    <div className='flex flex-col pb-24'>
      {listMyActivity.map((post, index) => {
        return (
          <div className='m-2 flex' key={index}>
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
