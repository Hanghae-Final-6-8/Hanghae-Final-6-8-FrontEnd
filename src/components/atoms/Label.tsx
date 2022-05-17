import classnames from 'classnames';
import { check } from '../../assets/icons';

interface LabelProps {
  children: React.ReactNode;
  htmlFor: string;
  type?: string;
}

const Label = (props: LabelProps) => {
  const tasteAnswer = props.type === 'tasteAnswer';
  const tasteAnswerSelect = props.type === 'tasteAnswerSelect';

  return (
    <label
      className={classnames(
        '',
        {
          'bg-white h-11 rounded-btn text-body font-500 e px-3.5 py-2 shadow-contents text-gray30 cursor-pointer':
            tasteAnswer,
        },
        {
          'border-x border-y border-brownS02 bg-white h-11 rounded-btn text-body font-500 text-brownS02 px-3.5 py-2 shadow-contents cursor-pointer':
            tasteAnswerSelect,
        }
      )}
      htmlFor={props.htmlFor}
    >
      {tasteAnswerSelect ? (
        <div className='absolute right-2.5'>
          <img
            style={{
              filter:
                'invert(26%) sepia(55%) saturate(385%) hue-rotate(336deg) brightness(101%) contrast(89%)',
            }}
            src={check}
          />
        </div>
      ) : null}
      {props.children}
    </label>
  );
};

export default Label;
