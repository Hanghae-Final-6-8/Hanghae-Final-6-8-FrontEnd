import { Text } from './';
import classnames from 'classnames';

interface BtnProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: string;
}

const Button = (props: BtnProps) => {
  const className = props.className;
  const bgBrownP = props.type === 'brownPType';
  const tasteSurvey = props.type === 'tasteSurvey';
  const tasteSurveyNoneActive = props.type === 'tasteSurveyNoneActive';
  const toastPopup = props.type === 'toastPopup';

  return (
    <button
      className={classnames(`w-full rounded-btn py-2.5 ${className}`, {
        'mt-4': className === undefined && props.type === undefined,
        'bg-brownP bg-cover': className && props.type === undefined,
        'bg-gray60 text-gray20': props.className === undefined,
        'bg-brownP bg-cover mt-30px': bgBrownP,
        'absolute font-500 text-sub2 bottom-2 bg-brownP bg-cover shadow-tasteBrown':
          tasteSurvey,
        'absolute font-500 text-sub2 bottom-2 bg-gray30 shadow-tasteBrown':
          tasteSurveyNoneActive,
        'bg-brownP bg-cover mt-30px mb-34px text-white shadow-tasteBrown text-body font-500':
          toastPopup,
      })}
      onClick={props.onClick}
    >
      <Text btnClassName={className} type={props.type}>
        {props.children}
      </Text>
    </button>
  );
};

export default Button;
