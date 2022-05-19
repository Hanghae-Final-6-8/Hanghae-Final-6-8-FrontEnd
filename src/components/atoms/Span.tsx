import classnames from 'classnames';

interface SpanProps {
  children: React.ReactNode;
  className?: string;
  fc?: string;
  type?: string;
}

const Span = (props: SpanProps) => {
  const className = props.className;
  const fontColor = props.fc === 'strong';
  const strong = props.type === 'strong';

  return (
    <span
      className={classnames(
        `${className}`,
        { 'text-brownS02': fontColor },
        { 'text-brownS02': strong }
      )}
    >
      {props.children}
    </span>
  );
};

export default Span;
