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
          'mx-auto w-30px pt-5': bottomNav,
          'filter-gray30': !isClicked,
        })}
        src={props.src}
      />
    </>
  );
};

export default Icon;
