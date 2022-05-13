interface Wrapper {
  onClick: () => void;
}

const DarkWrapper = (props: Wrapper) => {
  return (
    // eslint-disable-next-line
    <div
      className='absolute top-0 left-0 w-full h-full bg-[rgba(11,11,11,0.45)]'
      onClick={props.onClick}
    ></div>
  );
};

export default DarkWrapper;
