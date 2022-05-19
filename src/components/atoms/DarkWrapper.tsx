import classnames from 'classnames';

interface WrapperProps {
  children: React.ReactNode;
  onClick: () => void;
  data?: string;
}

const DarkWrapper = (props: WrapperProps) => {
  const mainModal = props.data === 'mainModal';

  return (
    <div
      className={classnames(
        'fixed z-10 touch-none top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.3)]',
        { 'px-6': mainModal }
      )}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export default DarkWrapper;
