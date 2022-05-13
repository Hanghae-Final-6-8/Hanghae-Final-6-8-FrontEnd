import React, { useEffect } from 'react';
import { useState } from 'react';
import postsSlice from '../../redux/modules/posts';
// import imageSlice from '../../redux/modules/image';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/configureStore';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configureStore';
import { PostsItemDataParams } from '../../redux/modules/posts';
import { PostsState } from '../../redux/modules/posts';
// import { axiosAddPosts } from '../redux/modules/posts';

const AddEditPost = () => {
  // 수정하려고 들어왔을 때
  const postsIdparams = useParams();

  const navigate = useNavigate();

  const appDispatch = useAppDispatch();

  const [title, setTitle] = useState<string>('');
  // 커뮤니티 태그
  const [inputTag, setInputTag] = useState<string>('');
  const [tagName, setTagName] = useState<Array<string>>([]);

  const [content, setContent] = useState<string>('');

  // 수정하기위한 포스트를 담아두기 위해.
  const postList: PostsState = { list: [] };
  let post: PostsItemDataParams | undefined = {
    postsId: 0,
    nickname: '',
    postsImage: '',
    title: '',
    content: '',
    tagName: [],
    createdAt: '',
    modifiedAt: '',
  };
  // 게시글 수정 url로 들어온 경우
  if (postsIdparams.postsId) {
    postList.list = useSelector((store: RootState) => store.posts.list);
    post = postList.list.find((post: PostsItemDataParams) => {
      return post.postsId === Number(postsIdparams.postsId);
    });
  }

  useEffect(() => {
    setTitle(post ? post.title : '');
    setContent(post ? post.content : '');
    setTagName(post ? post.tagName : []);
  }, []);

  // 커뮤니티 타이틀 set
  const getInputTitleFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  // 커뮤니티 태그 set
  const getInputTagNameFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  // 커뮤니티 내용 set
  const getInputContentFrom = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // 커뮤니티 등록
  const handleAddPosts = () => {
    appDispatch(
      postsSlice.actions.addPost({
        postsId: undefined,
        title,
        content,
        tagName,
        postsImage:
          'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg',
        navi: navigate,
      })
    );

    // API연결할때 주석 해제
    // appDispatch(axiosAddPost({
    //   title,
    //   content,
    //   tagName,
    //   postsImage:
    //     'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg',
    // }));
  };

  const handleEditpost = () => {
    appDispatch(
      postsSlice.actions.editPost({
        postsId: post ? post.postsId : undefined,
        title,
        content,
        tagName,
        postsImage:
          'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg',
        navi: navigate,
      })
    );
  };

  const handleBacktoPrev = () => {
    navigate(-1);
  };

  return (
    <div style={{ border: '1px solid #111' }}>
      <button className='m-2' onClick={handleBacktoPrev}>
        ◀
      </button>
      {postsIdparams.postsId ? <h1>게시글 수정</h1> : <h1>게시글 작성</h1>}

      <input
        type='text'
        placeholder='제목을 입력해주세요'
        onChange={getInputTitleFrom}
        value={title}
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
      {/* <img
        src={preview ? preview : 'http://via.placeholder.com/400x300'}
        className='h-52 w-52 bg-gradient-to-r from-cyan-500 to-indigo-500'
      /> */}
      <textarea
        className='h-52 w-52'
        style={{ border: '1px solid #111', resize: 'none' }}
        onChange={getInputContentFrom}
        value={content}
      />

      {postsIdparams.postsId ? (
        <button onClick={handleEditpost}>수정하기</button>
      ) : (
        <button
          className='bg-gradient-to-r from-cyan-500 to-indigo-500'
          onClick={handleAddPosts}
        >
          등록하기
        </button>
      )}
    </div>
  );
};

export default AddEditPost;
