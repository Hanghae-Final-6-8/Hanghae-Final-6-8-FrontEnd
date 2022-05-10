import { bookmark } from '../assets/icons/index';

const Main = () => {
  return (
    <div className='relative px-6 py-12 bg-gray-400 w-full h-full'>
      <div className='relative bg-orange-500'>
        <div className='absolute right-0'>
          <img src={bookmark} />
        </div>
        <div className='text-head font-medium'>Copick</div>
      </div>
      <div className='absolute left-0 top-48 rounded-t-40 bg-white w-full'>
        hi
        <figure>
          <img src='' />
        </figure>
      </div>
    </div>
  );
};

export default Main;
