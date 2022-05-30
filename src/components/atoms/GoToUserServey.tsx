import { right } from '../../assets/icons';

const GoToUserServey = () => {
  return (
    <>
      <a
        href='https://forms.gle/Qh9x2FM1dU92RWKBA'
        target='_blank'
        rel='noopener noreferrer'
      >
        <div className='absolute right-0 text-body rounded-full shadow-contents text-gray60 pl-4 pr-2 py-1 cursor-pointer animate-moveHorizontal flex select-none border-2'>
          <div>
            <p className='font-700 text-gray80'>설문조사</p>
            <p>하러가기</p>
          </div>
          <img className='filter-gray30' src={right} />
        </div>
      </a>
    </>
  );
};

export default GoToUserServey;
