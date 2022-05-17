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
  const tasteSurvey = props.type === 'tasteSurvey';
  const toastPopup = props.type === 'toastPopup';

  const mt60px = props.mt === '60px';

  return (
    <button
      className={classnames('w-full rounded-btn py-2.5', {
        'mt-4': props.mt === undefined || props.type === undefined,
        'bg-brownP bg-cover': props.bg === undefined,
        'bg-gray60 text-gray20': props.bg === undefined,
        'bg-brownP bg-cover mt-30px': bgBrownP,
        'mt-60px': mt60px,
        'absolute font-500 text-sub2 bottom-2 shadow-tasteBrown': tasteSurvey,
        'mt-30px mb-34px text-white shadow-tasteBrown text-body font-500':
          toastPopup,
      })}
      onClick={props.onClick}
    >
      <Text fs={props.fs} fw={props.fw} fc={props.fc} type={props.type}>
        {props.children}
      </Text>
    </button>
  );
};

export default Button;
