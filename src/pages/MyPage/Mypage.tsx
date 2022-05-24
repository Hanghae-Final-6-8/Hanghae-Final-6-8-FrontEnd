import LogoutBtn from '../../components/molecules/LogoutBtn';
import MypageHeader from '../../components/molecules/MypageHeader';
import MypageOverviewActivity from '../../components/molecules/MypageOverviewActivity';
import MypageTabs from '../../components/molecules/MypageTabs';
import KakaoShare from '../../components/atoms/KakaoShare';

const Mypage = () => {
  return (
    <div>
      <KakaoShare />
      <span className='font-bold'>마이</span>
      <LogoutBtn />
      <div className='border-b-8 pb-9 mb-2'>
        <MypageHeader />
        <MypageOverviewActivity />
      </div>

      <MypageTabs />
    </div>
  );
};

export default Mypage;
