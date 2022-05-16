import { Outlet } from 'react-router-dom';
import { cross, left } from '../../assets/icons';
import { useNavigate } from 'react-router-dom';

const TasteSurvey = () => {
  const navigate = useNavigate();
  const handleToMain = () => {
    navigate('../main', { replace: true });
  };

  const handleToPrevPage = () => {
    // 일단 뒤로가기 처리를 해놨으나 로직에 따라 변경할 수 있습니다.
    navigate(-1);
  };

  return (
    <>
      <div className='relative h-full'>
        <button className='absolute top-3.5 left-0'>
          <img className='w-8' src={left} onClick={handleToPrevPage} />
        </button>
        <button className='absolute top-3.5 right-0' onClick={handleToMain}>
          <img className='w-8' src={cross} />
        </button>
        <Outlet />
      </div>
    </>
  );
};

export default TasteSurvey;
