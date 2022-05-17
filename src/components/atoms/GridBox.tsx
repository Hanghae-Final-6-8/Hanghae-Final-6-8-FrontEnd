import classnames from 'classnames';

interface GridBoxProps {
  children: React.ReactNode;
  pt?: string;
  type?: string;
}

const GridBox = (props: GridBoxProps) => {
  const flexBasic = props.type === 'flexBasic';
  const flexTasteSurvey = props.type === 'flexTasteSurvey';

  return (
    <div
      className={classnames('', {
        'flex flex-col': flexBasic,
        'flex flex-col mt-10 gap-4': flexTasteSurvey,
      })}
    >
      {props.children}
    </div>
  );
};

export default GridBox;
