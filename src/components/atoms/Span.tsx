import classnames from 'classnames';

interface SpanProps {
  children: React.ReactNode;
  className?: string;
  fc?: string;
}

const Span = (props: SpanProps) => {
  const className = props.className;
  const fontColor = props.fc === 'strong';

  return (
    <span
      className={classnames(`${className}`, { 'text-amber-900': fontColor })}
    >
      {props.children}
    </span>
  );
};

export default Span;
