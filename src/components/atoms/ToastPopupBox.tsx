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
}

const ToastPopupBox = (props: ToastPopupBoxProps) => {
  const defaultBox = props.type === 'default';
  const crossBtn = props.cross;

  return (
    <div
      className={classnames('bg-white', {
        'fixed z-20 w-full bottom-0 pb-84px px-30px rounded-t-40px pt-34px':
          defaultBox,
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
