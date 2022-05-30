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

  const scrolly: any = location.state ? location.state : null;
  const scrollyValue = scrolly !== null ? scrolly.scrolly : null;

  const handleToPrevPage = () => {
    scrolly !== null
      ? navigate('/beans', { state: { scrollyValue } })
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
