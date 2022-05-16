import classnames from 'classnames';

interface GridBox {
  children: React.ReactNode;
  pt?: string;
}

const GridBox = (props: GridBox) => {
  return <div className={classnames('', {})}>{props.children}</div>;
};

export default GridBox;
