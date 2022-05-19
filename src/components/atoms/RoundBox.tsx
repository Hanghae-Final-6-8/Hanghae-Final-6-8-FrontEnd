import classnames from 'classnames';

interface RoundBox {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  bg?: string;
  round?: string;
}

const RoundBox = (props: RoundBox) => {
  const className = props.className;
  const mainModal = props.round === 'mainModal';

  return (
    <div
      className={classnames(`bg-white ${className}`, {
        'mt-48 px-30px py-34px rounded-36px': mainModal,
      })}
    >
      {props.children}
    </div>
  );
};

export default RoundBox;
