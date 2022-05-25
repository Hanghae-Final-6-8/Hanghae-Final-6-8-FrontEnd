import { search } from '../../assets/icons';
import { useState } from 'react';
import { useAppDispatch } from '../../redux/configureStore';
import { searchBeans } from '../../redux/modules/beans';

const BeansSearchForm = () => {
  const appDispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');

  const checker = (str: string) => {
    /* eslint-disable-next-line */
    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
    if (regExp.test(str)) {
      return true;
    } else {
      return false;
    }
  };

  const handleInputValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (inputValue === '') {
      alert('검색어를 입력해주세요!');
      return;
    } else if (checker(inputValue)) {
      alert('특수문자를 제거해주세요!');
      setInputValue('');
      return;
    }

    appDispatch(searchBeans(inputValue));
    setInputValue('');
  };

  return (
    <>
      <form className='relative' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder=' 당신의 원두를 찾아보세요...'
          className='w-full bg-brownP h-[43px] bg-transparent text-white placeholder-inherit rounded-full px-5'
          maxLength={20}
          value={inputValue}
          onChange={handleInputValue}
        />
        <button type='submit' className='absolute right-4 top-2'>
          <img
            style={{
              filter:
                'invert(94%) sepia(100%) saturate(0%) hue-rotate(240deg) brightness(108%) contrast(101%)',
            }}
            src={search}
          />
        </button>
      </form>
    </>
  );
};

export default BeansSearchForm;
