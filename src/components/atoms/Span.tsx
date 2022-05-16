import classnames from 'classnames';

interface Span {
  fc?: string;
  className?: string;
  children: React.ReactNode;
}

const Span = (props: Span) => {
  const fontColor = props.fc === 'strong';

  return (
    <span className={classnames('', { 'text-amber-900': fontColor })}>
      {props.children}
    </span>
  );
};

export default Span;
