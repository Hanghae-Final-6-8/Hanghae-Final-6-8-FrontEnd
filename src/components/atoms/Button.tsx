interface BtnProps {
  children: string;
  onClick?: () => void;
}

const Button = (props: BtnProps) => {
  return (
    <button
      className='w-full mt-60px mt bg-stone-400 text-white rounded-btn font-500 text-sub2 py-2.5'
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
