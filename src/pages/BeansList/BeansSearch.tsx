import { useState } from 'react';
import { Input } from '../../components/atoms';
import { search } from '../../assets/icons';

const BeansSearch = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setInputValue('');
  };

  return (
    <>
      <form className='relative' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder=' 당신의 원두를 찾아보세요...'
          className='w-full bg-brownP h-[43px] bg-transparent text-white placeholder-inherit rounded-full px-5'
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

export default BeansSearch;
