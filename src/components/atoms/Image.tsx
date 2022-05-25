import classnames from 'classnames';

interface ImageProps {
  children?: React.ReactNode;
  src: string;
  className?: string;
  type?: string;
  onClick?: () => void;
  alt: string;
}

const Image = (props: ImageProps) => {
  const className = props.className;
  const circle = props.type === 'circle';

  return (
    <div
      className={classnames(
        `relative overflow-hidden text-center align-middle ${className}`,
        {
          'rounded-full h-20 w-20 border-2 border-white shadow-contentsStore':
            circle,
        }
      )}
    >
      <img className='mx-auto' src={props.src} alt={props.alt} />
    </div>
  );
};

export default Image;
