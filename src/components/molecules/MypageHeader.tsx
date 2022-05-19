const MypageHeader = () => {
  return (
    <div className='flex justify-start'>
      <div className='bg-orange-400 w-10 h-10 rounded-full'>유저</div>
      <div className='flex flex-col'>
        <div>유저이름</div>
        <a href='#'>내 정보 수정하기</a>
      </div>
    </div>
  );
};

export default MypageHeader;
