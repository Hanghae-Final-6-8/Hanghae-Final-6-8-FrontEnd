import classnames from 'classnames';

interface Text {
  children: React.ReactNode;
  btnClassName?: string;
  className?: string;
  type?: string;
}

const Text = (props: Text) => {
  const className = props.className;

  const hasBtnClassName = props.btnClassName;

  const tasteNumber = props.type === 'tasteNumber';
  const head = props.type === 'head';
  const caption = props.type === 'caption';
  const tasteSurveyCaption = props.type === 'tasteSurveyCaption';
  const tasteCaption = props.type === 'tasteCaption';
  const white = props.type === 'white';

  return (
    <p
      className={classnames(
        `${className}`,
        {
          'text-gray90':
            className === undefined &&
            hasBtnClassName === undefined &&
            props.type === undefined,
        },
        { 'mt-84px font-700 text-sub text-gray60': tasteNumber },
        { 'font-500 text-sub': head },
        { 'mt-2.5 text-gray60 text-caption': caption },
        { 'text-gray60 text-caption text-right mt-5': tasteCaption },
        {
          'absolute font-400 text-caption text-brownS02 bottom-72px left-1/2 -translate-x-1/2':
            tasteSurveyCaption,
        },
        { 'text-white': white }
      )}
    >
      {props.children}
    </p>
  );
};

export default Text;
