import { Text } from './';
import classnames from 'classnames';

interface BtnProps {
  children: string;
  className?: string;
  onClick?: () => void;
  fs?: string;
  fw?: string;
  fc?: string;
  bg?: string;
  mt?: string;
  type?: string;
}

const Button = (props: BtnProps) => {
  const bgBrownP = props.type === 'brownPType';

  return (
    <button
      className={classnames('w-full rounded-btn py-2.5', {
        'mt-4': props.mt || props.type === undefined,
        'bg-brownP bg-cover': props.bg === undefined,
        'bg-gray60 text-gray20': props.bg === undefined,
        'bg-brownP bg-cover mt-30px': bgBrownP,
      })}
      onClick={props.onClick}
    >
      <Text fs={props.fs} fw={props.fw} fc={props.fc}>
        {props.children}
      </Text>
    </button>
  );
};

export default Button;
