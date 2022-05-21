import classnames from 'classnames';

interface InputProps {
  type: string;
  className?: string;
  customType?: string;
  value?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: InputProps) => {
  const className = props.className;
  const type = props.type;
  const value = props.value;
  const placeholder = props.placeholder;
  const onChange = props.onChange;

  const beans = props.customType === 'beans';

  return (
    <input
      onChange={onChange}
      type={type}
      value={value}
      placeholder={placeholder}
      className={classnames(`${className}`, { 'border ': beans })}
    />
  );
};

export default Input;
