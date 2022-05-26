import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/configureStore';
import { RootState } from '../../redux/configureStore';
import { getMyCommentDB } from '../../redux/modules/mypage';

const MyCommentEdit = () => {
  const appDispatch = useAppDispatch();
  useEffect(() => {
    !isMyCommentListLoaded && appDispatch(getMyCommentDB());
  }, []);

  const { myCommentList, isMyCommentListLoaded } = useSelector(
    (store: RootState) => store.mypage
  );
  return (
    <div>
      {myCommentList.map((comment, index) => {
        return (
          <div className='m-2 flex' key={index}>
            <div className='flex justify-between w-full'>
              <p>{comment.content}</p>
              <button>더보기</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyCommentEdit;
