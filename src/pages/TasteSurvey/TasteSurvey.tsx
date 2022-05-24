import { Outlet } from 'react-router-dom';
import { cross } from '../../assets/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PrevBtn } from '../../components/atoms';

const TasteSurvey = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleToMain = () => {
    navigate('../main', { replace: true });
  };

  // 현재 pathname을 가져오기 위한 useEffect 사용
  const [isUselessPath, setIseUselessPath] = useState(false);
  useEffect(() => {
    const currentLocation = location.pathname;
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
      <div className='relative h-full touch-none'>
        {!isUselessPath ? (
          <>
            <PrevBtn />
            <button className='absolute right-0' onClick={handleToMain}>
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
