import React, { useEffect } from 'react';
import { useState } from 'react';
import { editPostDB } from '../../redux/modules/posts';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/configureStore';
import { useForm } from 'react-hook-form';
import { camera } from '../../assets/icons';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configureStore';
import { PostsItemDataParams } from '../../redux/modules/posts';
import { PostsState } from '../../redux/modules/posts';
import { addPostDB } from '../../redux/modules/posts';
import { Button } from '../../components/atoms';
import { left } from '../../assets/icons';
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
  // 이미지 파일 전송용
  const [file, setFiles] = useState<File[]>([]);
  // 이미지 미리보기용
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

  // 수정용 포스트
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
  // 게시글수정 url경우
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
    setPrevImage(post ? post.postsImage : '');
  }, []);

  // 커뮤니티 타이틀 set
  const getInputTitleFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  // 커뮤니티 태그 set
  const getInputTagNameFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTag(e.target.value);
  };
  // 태그 추가
  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (inputTag.length !== 0 && e.key === 'Enter') {
      setTagName([inputTag, ...tagName]);
      setInputTag('');
    }
  };

  // 태그 지우기
  const deleteTag = (tag: string) => {
    setTagName(tagName.filter((t) => t !== tag));
  };

  // 커뮤니티 내용 set
  const getInputContentFrom = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // 커뮤니티 등록
  const handleAddPosts = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('tag_name', tagName.toString());
    formData.append('posts_image', file[0]);
    appDispatch(addPostDB({ formData, navi: navigate, prevImage }));
  };

  //커뮤니티 수정
  const handleEditpost = () => {
    const formData = new FormData();
    formData.append('posts_id', post!.postsId!.toString());
    formData.append('title', title);
    formData.append('content', content);
    formData.append('tag_name', tagName.toString());
    formData.append('posts_image', file[0]);
    appDispatch(editPostDB({ formData, navi: navigate, prevImage }));
  };

  const handleBacktoPrev = () => {
    navigate(-1);
  };

  return (
    <div>
      <button className='m-2 p-2' onClick={handleBacktoPrev}>
        <img src={left} />
      </button>
      {postsIdparams.postsId ? (
        <h1 className='text-center mb-5 text-[18px]'>게시물 수정</h1>
      ) : (
        <h1 className='text-center mb-5 text-[18px]'>새 게시물</h1>
      )}
      <div className='bg-white shadow-xl rounded-30px pt-5 pb-5 pl-5 pr-5'>
        <div className='flex flex-col w-full border-b pt-5 pb-5 '>
          <div className='flex mb-5'>
            <div className='relative mr-3'>
              <img className='w-24 h-24' src={prevImage ? prevImage : camera} />
              <label
                className='absolute top-0 left-0 w-24 h-24 opacity-0'
                htmlFor='inputFile'
              >
                파일업로드
              </label>
              <input
                id='inputFile'
                className='hidden'
                type='file'
                onChange={getOnLoadFileFrom}
                accept='image/*'
              />
            </div>

            <div className='w-48 h-24'>
              <input
                type='text'
                placeholder='제목을 입력해주세요'
                onChange={getInputTitleFrom}
                value={title}
              />
              <textarea
                className='h-full w-full resize-none outline-none'
                placeholder='당신의 커피를 보여주세요...'
                onChange={getInputContentFrom}
                value={content}
              />
            </div>
          </div>
          <div className='HashWrapOuter'>
            <input
              type='text'
              className='HashInput outline-none mb-1'
              placeholder='태그 입력후 Enter'
              onChange={getInputTagNameFrom}
              onKeyDown={onKeyDown}
              value={inputTag}
            />
          </div>

          <div>
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
          </div>
        </div>

        {postsIdparams.postsId ? (
          <Button
            className='text-white font-500 text-sub2 mt-12'
            type='brownPType'
            onClick={handleEditpost}
          >
            수정하기
          </Button>
        ) : (
          <Button
            className='text-white font-500 text-sub2 mt-12'
            type='brownPType'
            onClick={handleAddPosts}
          >
            공유하기
          </Button>
        )}
      </div>
    </div>
  );
};

export default AddEditPost;
