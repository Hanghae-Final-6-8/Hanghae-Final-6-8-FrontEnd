import classnames from 'classnames';

interface Wrapper {
  children: React.ReactNode;
  onClick: () => void;
  data?: string;
}

const DarkWrapper = (props: Wrapper) => {
  const mainModal = props.data === 'mainModal';

  return (
    <div
      className={classnames(
        'fixed z-10 touch-none top-0 left-0 w-full h-full bg-[rgba(11,11,11,0.45)]',
        { 'px-6': mainModal }
      )}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export default DarkWrapper;
