import { PrevBtn, Text } from '../../components/atoms';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configureStore';
import { logoCopickSquare } from '../../assets/logo';
import { camera } from '../../assets/icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/configureStore';
import { update } from '../../redux/modules/user';

const EditProfile = () => {
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  const [inputNickname, setInputNickname] = useState('');
  const [file, setFile] = useState<File[]>([]);
  const user = useSelector((state: RootState) => state.user);
  const [preview, setPreview] = useState(
    user.profile_url ? user.profile_url : logoCopickSquare
  );

  useEffect(() => {
    setInputNickname(user.nickname);
    setPreview(user.profile_url ? user.profile_url : logoCopickSquare);
  }, []);

  const handleEditProfileImg: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const file = e.currentTarget.files;

    if (file && file.length) {
      setFile((exist) => exist.concat(Array.from(file)));

      const selectFile = file[0];
      setPreviewImgByFileReader(selectFile);
    }
  };

  /**
   * 파일 리더를 이용하여 Preview 이미지를 변경하는 함수
   * @param file
   */
  const setPreviewImgByFileReader = (file: any) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
      const test = reader.result;
      console.log(test);
    };
  };

  const handleInputValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputNickname(e.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nickname', inputNickname);
    formData.append('imageFile', file[0]);
    console.log(file[0]);
    appDispatch(update(formData));
    navigate('/mypage', { replace: true });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='relative flex justify-between items-center'>
          <PrevBtn className='relative' />
          <Text className='font-500 text-head'>프로필 수정</Text>
          <button
            type='submit'
            className='text-sub2 text-brownS02 cursor-pointer'
          >
            저장
          </button>
        </div>
        <div className='w-100px h-100px mx-auto mt-6 relative'>
          <img
            className='overflow-hidden w-full h-full rounded-full'
            src={preview}
            alt={user.nickname}
          />

          <label
            htmlFor='imgUpload'
            className='h-8 w-8 rounded-full absolute bottom-0 right-0  bg-brownP bg-cover overflow-hidden flex cursor-pointer'
          >
            <img
              className='filter-gray30 mx-auto w-5'
              src={camera}
              alt='프로필 수정'
            />
          </label>
          <input
            id='imgUpload'
            type='file'
            className='hidden'
            accept='image/*'
            onChange={handleEditProfileImg}
          />
        </div>

        <div className='mt-6 relative'>
          <Text className='text-caption'>닉네임</Text>
          <input
            className='w-full border-b pb-2 mt-2 focus:outline-none'
            placeholder='닉네임을 입력해주세요'
            value={inputNickname}
            onChange={handleInputValue}
            maxLength={10}
          />
          <div className='absolute right-0 bottom-2 text-gray60 text-body'>
            {inputNickname.length < 11 ? `${inputNickname.length}/10` : '10/10'}
          </div>
        </div>
      </form>
    </>
  );
};

export default EditProfile;
