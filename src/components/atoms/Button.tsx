import { Text } from './';
import classnames from 'classnames';

interface BtnProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: any | null) => void;
  type?: string;
  data?: string | number;
}

const Button = (props: BtnProps) => {
  const className = props.className;
  const bgBrownP = props.type === 'brownPType';
  const tasteSurvey = props.type === 'tasteSurvey';
  const tasteSurveyNoneActive = props.type === 'tasteSurveyNoneActive';
  const toastPopup = props.type === 'toastPopup';

  const selectBtn = props.type === 'selectBtn';
  const clickedSelectBtn = props.type === 'clickedSelectBtn';

  return (
    <button
      className={classnames(
        `w-full rounded-btn py-2.5 ${className}`,
        {
          'mt-4': className === undefined && props.type === undefined,
          'bg-brownP bg-cover': className && props.type === undefined,
          'bg-gray60 text-gray20': className && props.type === undefined,
          'bg-brownP bg-cover mt-30px': bgBrownP,
          'absolute font-500 text-sub2 bottom-2 ext-white bg-brownP bg-cover shadow-tasteBrown text-white':
            tasteSurvey,
          'absolute font-500 text-sub2 bottom-2 text-white bg-gray30 shadow-tasteBrown':
            tasteSurveyNoneActive,
          'bg-brownP bg-cover mt-30px mb-34px  shadow-tasteBrown text-body font-500 text-white':
            toastPopup,
        },
        {
          'shadow-tasteBrown text-body mb-[3px] bg-white text-gray60':
            selectBtn,
          'shadow-tasteBrown text-body mb-[3px] bg-brownP text-white':
            clickedSelectBtn,
        }
      )}
      onClick={props.onClick}
      data-cafeid={props.data}
    >
      <Text btnClassName={className} type={props.type}>
        {props.children}
      </Text>
    </button>
  );
};

export default Button;
