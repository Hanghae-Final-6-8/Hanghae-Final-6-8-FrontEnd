interface Wrapper {
  children: React.ReactNode;
  onClick: () => void;
}

const DarkWrapper = (props: Wrapper) => {
  return (
    <div
      className='fixed touch-none top-0 left-0 w-full h-full bg-[rgba(11,11,11,0.45)]'
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export default DarkWrapper;
