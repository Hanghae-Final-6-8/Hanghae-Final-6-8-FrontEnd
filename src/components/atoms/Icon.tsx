import classnames from 'classnames';

interface IconProps {
  src: string;
  type?: string;
  className?: string;
  isClicked?: boolean;
}

const Icon = (props: IconProps) => {
  const className = props.className;
  const bottomNav = props.type === 'bottomNav';
  const isClicked = props.isClicked === true;

  return (
    <>
      <img
        className={classnames(`${className}`, {
          'mx-auto w-30px -translate-y-7px transition ease-in active:scale-75':
            bottomNav,
          'filter-gray30': !isClicked,
        })}
        src={props.src}
      />
    </>
  );
};

export default Icon;
