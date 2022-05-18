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
  const className = props.className === 'className';
  const bgBrownP = props.type === 'brownPType';
  const tasteSurvey = props.type === 'tasteSurvey';
  const tasteSurveyNoneActive = props.type === 'tasteSurveyNoneActive';
  const toastPopup = props.type === 'toastPopup';

  const mt60px = props.mt === '60px';

  return (
    <button
      className={classnames(`w-full rounded-btn py-2.5 ${props.className}`, {
        'mt-4':
          props.className === undefined &&
          props.mt === undefined &&
          props.type === undefined,
        'bg-brownP bg-cover':
          props.bg === undefined && props.type === undefined,
        'bg-gray60 text-gray20':
          props.className === undefined && props.bg === undefined,
        'bg-brownP bg-cover mt-30px': bgBrownP,
        'mt-60px': mt60px,
        'absolute font-500 text-sub2 bottom-2 bg-brownP bg-cover shadow-tasteBrown':
          tasteSurvey,
        'absolute font-500 text-sub2 bottom-2 bg-gray30 shadow-tasteBrown':
          tasteSurveyNoneActive,
        'bg-brownP bg-cover mt-30px mb-34px text-white shadow-tasteBrown text-body font-500':
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
