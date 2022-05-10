import { Bookmark } from '../assets/icons/index';

const Main = () => {
  return (
    <div className='relative px-6 py-12 bg-slate-300 w-full h-full'>
      <div className='relative'>
        <div className='absolute right-0'>
          <img src={Bookmark} />
        </div>
        <div className='border-2 text-d22 font-bold'>Copick</div>
      </div>
      <div className='grid border-2 grid-cols-7'>
        <div className='border-2'>hi</div>
        <div>hi</div>
        <div className='border-2 border-slate-700'>hi</div>
      </div>
      <div className='border-2 grid-cols-2'>Copick</div>
      <div className='border-2'>Copick</div>
      <div className='border-2'>Copick</div>
      <div className='border-2'>Copick</div>
    </div>
  );
};

export default Main;
