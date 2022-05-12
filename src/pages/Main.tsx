import { bookmark, down, share } from '../assets/icons/index';

const Main = () => {
  return (
    <main className='relative px-6 py-12 bg-gray-300 w-full h-full'>
      <header className='relative'>
        <strong className='text-head font-500'>Copick</strong>
        <button className='absolute top-0 right-0 w-8'>
          <img className='w-full' src={bookmark} />
        </button>
      </header>
      <div className='absolute px-6 pb-12 left-0 top-48 rounded-t-40px bg-white w-full shadow-main'>
        <article className='relative -top-14'>
          <figure className='relative'>
            <img
              className='mx-auto'
              src='https://via.placeholder.com/200x160'
            />
            <figcaption className='text-center text-sub2 font-500 mt-5.5'>
              <strong className='block'>파이크 플레이스 로스트</strong>
              <span className='inline-block mt-1.5 font-400 text-body bg-gray-200 px-2.5 py-0.75 rounded-xl text-gray-400'>
                블렌드
              </span>
            </figcaption>
          </figure>
          <p className='mt-3 text-body font-400 line-clamp-2 h-9 text-gray-400'>
            코코아와 구운 견과류의 은은하고 풍부한 향으로 가벼운 산도를
            조화시킴으로써 스타벅스의 다양성을 강조했습니다
          </p>
          <button className='block mx-auto'>
            <img src={down} />
          </button>
        </article>
        <div>text</div>
        <div>text</div>
        <div>text</div>
        <div>text</div>
        <div>text</div>
        <div>text</div>
        <div>text</div>
        <div>text</div>
        <div>text</div>
        <div>text</div>
        <div>text</div>
        <div>text</div>
        <div>text</div>
        <div>text</div>
        <div>text</div>
        <div>text</div>
        <div>text</div>
        <div>text</div>
        <div>text</div>
        <div>text</div>
        <div>text</div>
        <div>text</div>
      </div>
      <button className='fixed w-12 h-12 rounded-full z-10 bg-slate-400 bottom-104px right-6'>
        <img
          className='mx-auto '
          src={share}
          style={{
            filter:
              'invert(95%) sepia(0%) saturate(21%) hue-rotate(357deg) brightness(104%) contrast(108%)',
          }}
        />
      </button>
    </main>
  );
};

export default Main;
