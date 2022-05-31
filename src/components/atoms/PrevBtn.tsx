import { useNavigate, useLocation } from 'react-router-dom';
import { left } from '../../assets/icons';
import classnames from 'classnames';

interface PrevBtnProps {
  className?: string;
  type?: string;
}

const PrevBtn = (props: PrevBtnProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const className = props.className;

  const scrollY: any = location.state ? location.state : null;
  const scrollYValue = scrollY !== null ? scrollY.scroll : null;

  const handleToPrevPage = () => {
    scrollYValue
      ? navigate('/beans', { state: { scroll: scrollYValue } })
      : navigate(-1);

    if (document.referrer) {
      navigate('/beans');
    }
  };

  return (
    <button
      className={classnames(`absolute left-0 ${className}`)}
      type='button'
      onClick={handleToPrevPage}
    >
      <img className='w-8' src={left} />
    </button>
  );
};

export default PrevBtn;
