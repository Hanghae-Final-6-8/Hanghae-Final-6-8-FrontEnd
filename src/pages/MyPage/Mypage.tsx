import MypageHeader from '../../components/molecules/MypageHeader';
import MypageOverviewActivity from '../../components/molecules/MypageOverviewActivity';
import MypageTabs from '../../components/molecules/MypageTabs';

const Mypage = () => {
  return (
    <div className='relative'>
      <p className='font-500 text-head'>마이페이지</p>
      <div className='pb-9 mt-9 mb-2'>
        <MypageHeader />
        <MypageOverviewActivity />
      </div>

      <MypageTabs />
    </div>
  );
};

export default Mypage;
