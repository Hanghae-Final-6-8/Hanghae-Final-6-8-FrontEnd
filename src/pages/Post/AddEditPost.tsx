import React, { useEffect } from 'react';
import { useState } from 'react';
import { axiosEditPost } from '../../redux/modules/posts';
import postsSlice from '../../redux/modules/posts';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/configureStore';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configureStore';
import { PostsItemDataParams } from '../../redux/modules/posts';
import { PostsState } from '../../redux/modules/posts';
// import { axiosAddPost } from '../../redux/modules/posts';

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
  // 이미지 파일
  const [file, setFiles] = useState<File[]>([]);
  // 이미지 미리보기
  const [prevImage, setPrevImage] = useState<any>();

  const getOnLoadFileFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files;

    if (file && file.length) {
      setFiles((existing) => existing.concat(Array.from(file)));
    }

    const reader = new FileReader();
    const toPrevFile = file![0];
    reader.readAsDataURL(toPrevFile);
    reader.onloadend = () => {
      setPrevImage(reader.result);
    };
  };

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
        postsId: Math.random(),
        title: 'sample',
        content: 'this is sample data',
        tagName: ['카페', '갬성'],
        postsImage:
          'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg',
        navi: navigate,
      })
    );

    // const formData = new FormData();
    // formData.append('title', title);
    // formData.append('content', content);
    // formData.append('tag_name', '[' + tagName.toString() + ']');
    // formData.append('posts_image', file[0]);
    // appDispatch(axiosAddPost({ formData, navi: navigate }));
  };

  //커뮤니티 수정
  const handleEditpost = () => {
    const formData = new FormData();
    formData.append('posts_id', post!.postsId.toString());
    formData.append('title', title);
    formData.append('content', content);
    formData.append('tag_name', '[' + tagName.toString() + ']');
    formData.append('posts_image', file[0]);
    appDispatch(axiosEditPost({ formData, navi: navigate }));
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
      <img className='w-28 h-28' src={prevImage} />
      <input type='file' id='image' onChange={getOnLoadFileFrom} />
      <textarea
        className='h-52 w-full'
        style={{ border: '1px solid #111', resize: 'none' }}
        onChange={getInputContentFrom}
        value={content}
      />

      {postsIdparams.postsId ? (
        <button onClick={handleEditpost}>수정하기</button>
      ) : (
        <button className='border-2' onClick={handleAddPosts}>
          등록하기
        </button>
      )}
    </div>
  );
};

export default AddEditPost;
