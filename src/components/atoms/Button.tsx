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
  const bgBrownP = props.type === 'bgBrownP';
  const tasteSurvey = props.type === 'tasteSurvey';
  const tasteSurveyNoneActive = props.type === 'tasteSurveyNoneActive';
  const toastPopup = props.type === 'toastPopup';

  const selectBtn = props.type === 'selectBtn';
  const clickedSelectBtn = props.type === 'clickedSelectBtn';

  const loginBtn = props.type === 'loginBtn';

  return (
    <button
      className={classnames(
        `w-full rounded-btn py-2.5 ${className}`,
        {
          'mt-4': className === undefined && props.type === undefined,
          'bg-brownP bg-cover': className && props.type === undefined,
          'bg-gray60 text-gray20': className && props.type === undefined,
          'bg-brownP bg-cover mt-30px hover:brightness-75 active:brightness-75 transition ease-in select-none':
            bgBrownP,
          'absolute font-500 text-sub2 bottom-2 ext-white bg-brownP bg-cover shadow-tasteBrown text-white hover:brightness-75 active:brightness-75 transition ease-in select-none':
            tasteSurvey,
          'absolute font-500 text-sub2 bottom-2 text-white bg-gray30 shadow-tasteBrown':
            tasteSurveyNoneActive,
          'bg-brownP bg-cover mt-30px mb-34px  shadow-tasteBrown text-body font-500 text-white hover:brightness-75 active:brightness-75 transition ease-in select-none':
            toastPopup,
        },
        {
          'shadow-tasteBrown text-body mb-[3px] bg-white text-gray60 hover:bg-brownP hover:text-gray20 active:bg-brownP active:text-gray20':
            selectBtn,
          'shadow-tasteBrown text-body mb-[3px] bg-brownP text-white':
            clickedSelectBtn,
        },
        {
          'w-50px h-50px mr-7 rounded-full bg-white shadow-loginBtn hover:brightness-90 active:brightness-90 transition ease-in select-none':
            loginBtn,
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
