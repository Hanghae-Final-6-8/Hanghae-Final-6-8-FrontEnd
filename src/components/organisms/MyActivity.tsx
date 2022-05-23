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
    <div>
      {listMyActivity.map((post, index) => {
        return <div key={index}>{post.title}</div>;
      })}
    </div>
  );
};

export default MyActivity;
