import classnames from 'classnames';
import { cross } from '../../assets/icons';

interface ToastPopupBoxProps {
  children: React.ReactNode;
  onClick?: () => void;
  crossOnClick?: () => void;
  type?: string;
  bg?: string;
  round?: string;
  cross?: boolean;
  className?: string;
}

const ToastPopupBox = (props: ToastPopupBoxProps) => {
  const className = props.className;
  const defaultBox = props.type === 'default';
  const scrollBox = props.type === 'scrollBox';
  const crossBtn = props.cross;

  return (
    <div
      className={classnames(`bg-white ${className}`, {
        'absolute z-20 w-full bottom-0 pb-84px px-30px rounded-t-40px pt-34px':
          defaultBox,
        'absolute z-20 h-full w-full bottom-0 pb-20 rounded-t-40px pt-34px':
          scrollBox,
      })}
    >
      {crossBtn ? (
        <button className=' absolute right-30px'>
          <img
            className='w-8'
            style={{
              filter:
                'invert(64%) sepia(3%) saturate(20%) hue-rotate(14deg) brightness(102%) contrast(82%)',
            }}
            src={cross}
          />
        </button>
      ) : null}

      {props.children}
    </div>
  );
};

export default ToastPopupBox;
