import { Outlet } from 'react-router-dom';
import { cross } from '../../assets/icons';
import { useNavigate } from 'react-router-dom';

const TasteSurvey = () => {
  const navigate = useNavigate();
  const handleToMain = () => {
    navigate('../main');
  };

  return (
    <>
      <div className='relative'>
        <button className='absolute top-3.5 right-0' onClick={handleToMain}>
          <img className='w-8' src={cross} />
        </button>
        <Outlet />
      </div>
    </>
  );
};

export default TasteSurvey;
