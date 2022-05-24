import { right } from '../../assets/icons';

const MypageHeader = () => {
  return (
    <div className='flex justify-between mb-5'>
      <div className='flex'>
        <div className='bg-orange-400 w-10 h-10 rounded-full mr-3 text-center leading-10'>
          user
        </div>
        <div className='flex flex-col'>
          <div>유저이름</div>
          <a href='#'>내 정보 수정하기</a>
        </div>
      </div>

      <button>
        <img src={right} />
      </button>
    </div>
  );
};

export default MypageHeader;
