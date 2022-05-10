import React from 'react';
import { useState } from 'react';
import community from '../redux/modules/community';
import { useAppDispatch } from '../redux/configureStore';
import { axiosAddCommunity } from '../redux/modules/community';

const AddCommunity = () => {
  // configureStore.ts 에서 타입 정의한 dispatch
  const appDispatch = useAppDispatch();
  // 커뮤니티 타이틀
  const [title, setTitle] = useState<string>('');
  // 커뮤니티 태그
  const [inputTag, setInputTag] = useState<string>('');
  const [tagName, setTagName] = useState<Array<string>>([]);
  // 커뮤니티 내용
  const [content, setContent] = useState<string>('');

  // 커뮤니티 타이틀 set
  const getInputTitleFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  // 커뮤니티 태그 set
  const getInputTagNameFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setTagName([e.target.value, ...tagName]);
    setInputTag(e.target.value);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (inputTag.length !== 0 && e.key === 'Enter') {
      setTagName([inputTag, ...tagName]);
    }
  };
  const deleteTag = (tag: string) => {
    setTagName(tagName.filter((t) => t !== tag));
  };
  // 커뮤티치 내용 set
  const getInputContentFrom = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // 커뮤니티 등록
  const handleAddCommunity = () => {
    appDispatch(
      community.actions.addCommunity({
        title,
        content,
        tagName,
        postsImage:
          'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg',
      })
    );
    // API연결할때 주석 해제
    // appDispatch(axiosAddCommunity({
    //   title,
    //   content,
    //   tagName,
    //   postsImage:
    //     'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg',
    // }));
  };
  return (
    <div style={{ border: '1px solid #111' }}>
      <h1>게시글 작성</h1>
      <input
        type='text'
        placeholder='제목을 입력해주세요'
        onChange={getInputTitleFrom}
      />
      <input
        type='text'
        placeholder='태그 입력후 Enter'
        onChange={getInputTagNameFrom}
        onKeyDown={onKeyDown}
      />
      {tagName.length !== 0 ? (
        tagName.map((tag, index) => {
          return (
            <span
              className='inline-block bg-lime-800 text-white mr-1 rounded-md text-sm font-bold p-1 cursor-pointer'
              key={index}
              onClick={() => {
                deleteTag(tag);
              }}
            >
              {tag}
            </span>
          );
        })
      ) : (
        <></>
      )}
      <input type='file' />
      <div className='h-52 w-52 bg-gradient-to-r from-cyan-500 to-indigo-500'>
        이미지 미리보기
      </div>
      <textarea
        className='h-52 w-52'
        style={{ border: '1px solid #111', resize: 'none' }}
        onChange={getInputContentFrom}
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
