import { Outlet } from 'react-router-dom';
import { cross, left } from '../../assets/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const TasteSurvey = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleToMain = () => {
    navigate('../main', { replace: true });
  };

  const handleToPrevPage = () => {
    // 일단 뒤로가기 처리를 해놨으나 로직에 따라 변경할 수 있습니다.
    navigate(-1);
  };

  // 현재 pathname을 가져오기 위한 useEffect 사용
  const [isUselessPath, setIseUselessPath] = useState(false);
  useEffect(() => {
    const currentLocation = location.pathname;
    console.log(currentLocation);
    if (
      currentLocation === '/survey/loading' ||
      currentLocation === '/survey/needlogin'
    ) {
      setIseUselessPath(true);
    } else {
      setIseUselessPath(false);
    }
  }, [location.pathname]);

  return (
    <>
      <div className='relative h-full'>
        {!isUselessPath ? (
          <>
            <button className='absolute top-3.5 left-0'>
              <img className='w-8' src={left} onClick={handleToPrevPage} />
            </button>
            <button className='absolute top-3.5 right-0' onClick={handleToMain}>
              <img className='w-8' src={cross} />
            </button>
          </>
        ) : null}
        <Outlet />
      </div>
    </>
  );
};

export default TasteSurvey;
