import LogoutBtn from '../../components/molecules/LogoutBtn';
import MypageHeader from '../../components/molecules/MypageHeader';
import MypageOverviewActivity from '../../components/molecules/MypageOverviewActivity';
import MypageTabs from '../../components/molecules/MypageTabs';
// import mypageMolecules from '../../components/molecules/index';

const Mypage = () => {
  return (
    <div>
      {/* 마이 페이지 입니다.
      <LogoutBtn /> */}
      <MypageHeader />
      <MypageOverviewActivity />
      <MypageTabs />
    </div>
  );
};

export default Mypage;
