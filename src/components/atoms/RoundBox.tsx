import classnames from 'classnames';
import { cross } from '../../assets/icons';

interface RoundBox {
  children: React.ReactNode;
  type?: string;
  onClick?: (e: any | null) => void;
  className?: string;
  bg?: string;
  round?: string;
  id?: string;
  cafeId?: number;
  data?: string | number;
}

const RoundBox = (props: RoundBox) => {
  const className = props.className;
  const mainModal = props.round === 'mainModal';
  const mainRoundBox = props.type === 'mainRoundBox';

  const beansRoundBox = props.type === 'beansRoundBox';
  const main2RoundBox = props.type === 'main2RoundBox';

  const isOnClick = props.onClick;

  return (
    <>
      <div
        className={classnames(
          `bg-white ${className}`,
          { 'cursor-pointer': isOnClick },
          {
            'relative mt-48 px-30px py-34px rounded-36px': mainModal,
            'relative rounded-30px px-7 py-30px shadow-contents': mainRoundBox,
          },
          {
            'relative rounded-30px px-5 py-5 shadow-con14': beansRoundBox,
          },
          {
            'relative rounded-30px px-5 py-5 items-center flex w-[280px]':
              main2RoundBox,
          }
        )}
        onClick={props.onClick}
        data-beanid={props.data}
      >
        {mainModal ? (
          <button className=' absolute right-5'>
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
    </>
  );
};

export default RoundBox;
