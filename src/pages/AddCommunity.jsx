import { useState } from 'react';
import { useDispatch } from 'react-redux';
import community from '../redux/modules/community';

const AddCommunity = () => {
  const dispatch = useDispatch();

  const [commuTitle, setCommuTitle] = useState('');
  const [commuTag, setCommuTag] = useState('');

  // 커뮤니티 타이틀
  const inputTitle = (e) => {
    setCommuTitle(e.target.value);
  };
  // 커뮤니티 태그
  const inputTag = (e) => {
    setCommuTag(e.target.value);
  };
  // 커뮤니티 등록
  const handleAddCommunity = () => {
    dispatch(community.actions.addCommunity({ commuTitle, commuTag }));
  };

  return (
    <div style={{ border: '1px solid #111' }}>
      <h1>게시글 작성</h1>
      <input
        type='text'
        placeholder='제목을 입력해주세요'
        onChange={inputTitle}
      />
      <input type='text' placeholder='태그 입력' onChange={inputTag} />
      <input type='file' />
      <div className='h-52 w-52 bg-gradient-to-r from-cyan-500 to-indigo-500'>
        이미지 미리보기
      </div>
      <textarea
        className='h-52 w-52'
        style={{ border: '1px solid #111', resize: 'none' }}
      />
      <button
        className='bg-gradient-to-r from-cyan-500 to-indigo-500'
        onClick={handleAddCommunity}
      >
        등록하기
      </button>
    </div>
  );
};

export default AddCommunity;
