import classnames from 'classnames';

interface GridBoxProps {
  children: React.ReactNode;
  className?: string;
  type?: string;
}

const GridBox = (props: GridBoxProps) => {
  const className = props.className;
  const flexBasic = props.type === 'flexBasic';
  const flexTasteSurvey = props.type === 'flexTasteSurvey';
  const flexTasteSurvey06 = props.type === 'flexTasteSurvey06';
  const mainRecommendSimmilar = props.type === 'mainRecommendSimmilar';

  return (
    <div
      className={classnames(`${className}`, {
        'flex flex-col': flexBasic,
        'flex flex-col mt-10 gap-4': flexTasteSurvey,
        'grid grid-cols-2 mt-2 gap-2.5': flexTasteSurvey06,
        'grid grid-cols-2 mt-5 gap-2.5': mainRecommendSimmilar,
      })}
    >
      {props.children}
    </div>
  );
};

export default GridBox;
