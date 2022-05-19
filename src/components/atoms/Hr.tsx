import classnames from 'classnames';

interface HrProps {
  className?: string;
  type?: string;
}

const Hr = (props: HrProps) => {
  const main100 = props.type === 'main100';

  if (props.type === 'main100') {
    return (
      <hr
        className={classnames('mx-auto', { 'mt-9px': main100 })}
        style={{ width: '100px' }}
      />
    );
  } else if (props.type === 'taste327') {
    return (
      <hr
        className={classnames('mx-auto mt-5')}
        style={{ width: '327px', borderColor: '#f6f6f6' }}
      />
    );
  }
  return <></>;
};

export default Hr;
