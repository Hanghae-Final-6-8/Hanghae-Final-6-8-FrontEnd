import { Bookmark } from '../assets/icons/index';

const Main = () => {
  return (
    <div className='relative px-6 py-12 bg-slate-300 w-full h-full'>
      <div className='relative'>
        <div className='absolute right-0'>
          <img src={Bookmark} />
        </div>
        <div className='border-2 text-head font-robotoM'>Copick</div>
        <div className='border-2 text-head '>Test 테스트입니다</div>
        <div className='border-2 text-head  font-medium'>Test 테스트입니다</div>
        <div className='border-2 text-head  font-bold'>Test 테스트입니다</div>

        <div className='border-2 font-test1 font-regular'>
          Test 테스트입니다
        </div>
        <div className='border-2 font-test1 font-medium'>Test 테스트입니다</div>
        <div className='border-2  font-bold'>Test 테스트입니다</div>
        <hr />
        <p className=' font-regular'>Hello World! 헬로우 월드!</p>
        <p className=' font-medium'>Hello World! 헬로우 월드!</p>
        <p className=' font-bold'>Hello World! 헬로우 월드!</p>
        <p className=' font-regular'>Hello World! 헬로우 월드!</p>
        <p className=' font-medium'>Hello World! 헬로우 월드!</p>
        <p className=' font-bold'>Hello World! 헬로우 월드!</p>
        <p className=''>Hello World! 헬로우 월드!</p>
        <div className='border-2 text-head font-notoR'>Test 테스트입니다</div>
      </div>
    </div>
  );
};

export default Main;
