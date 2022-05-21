import classnames from 'classnames';

interface RoundBox {
  children: React.ReactNode;
  type?: string;
  onClick?: () => void;
  className?: string;
  bg?: string;
  round?: string;
  id?: string;
  cafeId?: number;
}

const RoundBox = (props: RoundBox) => {
  const className = props.className;
  const mainModal = props.round === 'mainModal';
  const mainRoundBox = props.type === 'mainRoundBox';

  const beansRoundBox = props.type === 'beansRoundBox';

  const isOnClick = props.onClick;

  return (
    <div
      className={classnames(
        `bg-white ${className}`,
        { 'cursor-pointer': isOnClick },
        {
          'mt-48 px-30px py-34px rounded-36px': mainModal,
          'relative rounded-30px px-7 py-30px shadow-contents': mainRoundBox,
        },
        {
          'relative rounded-30px px-5 py-5 shadow-con14': beansRoundBox,
        }
      )}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export default RoundBox;
