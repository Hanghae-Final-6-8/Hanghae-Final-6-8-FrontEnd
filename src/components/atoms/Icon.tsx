import classnames from 'classnames';

interface IconProps {
  src: string;
}

const Icon = (props: IconProps) => {
  return (
    <>
      <img src={props.src} />
    </>
  );
};

export default Icon;
