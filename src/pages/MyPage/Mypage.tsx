import MypageHeader from '../../components/molecules/MypageHeader';
import MypageOverviewActivity from '../../components/molecules/MypageOverviewActivity';
import MypageTabs from '../../components/molecules/MypageTabs';

const Mypage = () => {
  return (
    <div>
      <p className='font-500 text-head'>마이페이지</p>
      <div className='border-b-8 pb-9 mt-9 mb-2'>
        <MypageHeader />
        <MypageOverviewActivity />
      </div>

      <MypageTabs />
    </div>
  );
};

export default Mypage;
