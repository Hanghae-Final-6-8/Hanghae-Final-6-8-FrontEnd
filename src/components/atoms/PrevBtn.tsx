import { useNavigate } from 'react-router-dom';
import { left } from '../../assets/icons';
import classnames from 'classnames';

interface PrevBtnProps {
  className?: string;
}

const PrevBtn = (props: PrevBtnProps) => {
  const navigate = useNavigate();
  const handleToPrevPage = () => {
    navigate(-1);
  };

  const className = props.className;

  return (
    <button className={classnames(`absolute left-0 ${className}`)}>
      <img className='w-8' src={left} onClick={handleToPrevPage} />
    </button>
  );
};

export default PrevBtn;
