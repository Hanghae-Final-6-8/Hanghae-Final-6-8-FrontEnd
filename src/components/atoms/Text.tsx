import classnames from 'classnames';

interface Text {
  children: React.ReactNode;
  btnClassName?: string;
  className?: string;
  type?: string;
  onClick?: () => void;
}

const Text = (props: Text) => {
  const className = props.className;

  const hasBtnClassName = props.btnClassName;

  const tasteNumber = props.type === 'tasteNumber';
  const head = props.type === 'head';
  const caption = props.type === 'caption';
  const tasteSurveyCaption = props.type === 'tasteSurveyCaption';
  const tasteCaption = props.type === 'tasteCaption';
  const white = props.type === 'white';
  const mainSubTitle = props.type === 'mainSubTitle';
  const mainBeansFlavor = props.type === 'mainBeansFlavor';
  const mainBodyTitle = props.type === 'mainBodyTitle';
  const mainRedcommendSimmilar = props.type === 'mainRedcommendSimmilar';

  const description = props.type === 'description';
  const clickedDescription = props.type === 'clickedDescription';

  const main2header = props.type === 'main2header';

  const beansNav = props.type === 'beansNav';
  const beansNavClicked = props.type === 'beansNavClicked';

  return (
    <p
      className={classnames(
        `${className}`,
        {
          'text-gray90':
            className === undefined &&
            hasBtnClassName === undefined &&
            props.type === undefined,
        },
        { 'mt-16 font-700 text-sub text-gray60': tasteNumber },
        { 'font-500 text-sub': head },
        { 'mt-2.5 text-gray60 text-caption': caption },
        { 'text-gray60 text-caption text-right mt-3': tasteCaption },
        {
          'absolute font-400 text-caption text-brownS02 bottom-72px left-1/2 -translate-x-1/2':
            tasteSurveyCaption,
        },
        { 'text-white': white },
        {
          'text-gray90 text-sub2 font-500 flex': mainSubTitle,
          'inline-block border-gray30 border-x border-y mt-3.5 font-400 text-body px-2.5 py-0.75 rounded-xl text-gray90':
            mainBeansFlavor,
          'font-500 text-sub': mainBodyTitle,
          'text-center text-gray90 text-caption font-500 mt-2.5':
            mainRedcommendSimmilar,
          'mt-3 text-body font-400 line-clamp-2 h-11 text-gray-400':
            description,
          'mt-3 text-body font-400 text-gray-400': clickedDescription,
        },
        { 'font-700 text-head': main2header },
        {
          'font-500 text-gray30 text-body': beansNav,
          'font-500 text-gray90 text-body underline decoration-2 underline-offset-10':
            beansNavClicked,
        }
      )}
      onClick={props.onClick}
    >
      {props.children}
    </p>
  );
};

export default Text;
