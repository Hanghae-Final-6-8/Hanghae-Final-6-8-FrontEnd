import classnames from 'classnames';
import { check } from '../../assets/icons';

interface LabelProps {
  children: React.ReactNode;
  htmlFor: string;
  type?: string;
  ta?: string;
  img?: string;
}

const Label = (props: LabelProps) => {
  const tasteAnswer = props.type === 'tasteAnswer';
  const tasteAnswerSelect = props.type === 'tasteAnswerSelect';

  const flavorAnswer = props.type === 'flavorAnswer';
  const flavorAnswerSelect = props.type === 'flavorAnswerSelect';

  const flavorAnswerSec = props.type === 'flavorAnswerSec';
  const flavorAnswerSecSelect = props.type === 'flavorAnswerSecSelect';

  const center = props.ta === 'center';

  return (
    <label
      className={classnames(
        '',
        { 'text-center': center },
        {
          'bg-white h-11 rounded-btn text-body font-500 e px-3.5 py-2 shadow-contents text-gray30 cursor-pointer':
            tasteAnswer,
        },
        {
          'border-x border-y border-brownS02 bg-white h-11 rounded-btn text-body font-500 text-brownS02 px-3.5 py-2 shadow-contents cursor-pointer':
            tasteAnswerSelect,
        },
        {
          'bg-white h-24 rounded-3xl text-body font-500 e px-3.5 py-5 shadow-contents text-gray30 cursor-pointer text-center':
            flavorAnswer,
        },
        {
          'border-x border-y border-brownS02 bg-white h-24 rounded-3xl text-body font-500 text-brownS02 px-3.5 py-5 shadow-contents cursor-pointer text-center':
            flavorAnswerSelect,
        },
        {
          'bg-white h-60px rounded-3xl text-body font-500 e px-3.5 py-5 shadow-contents text-gray30 cursor-pointer text-center':
            flavorAnswerSec,
        },
        {
          'border-x border-y border-brownS02 bg-white h-60px rounded-22px text-body font-500 text-brownS02 px-3.5 py-5 shadow-contents cursor-pointer text-center':
            flavorAnswerSecSelect,
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
      {flavorAnswerSelect || flavorAnswer ? (
        <div className=''>
          {flavorAnswerSelect ? (
            <img
              className='mx-auto w-9'
              style={{
                filter:
                  'invert(26%) sepia(55%) saturate(385%) hue-rotate(336deg) brightness(101%) contrast(89%)',
              }}
              src={props.img}
            />
          ) : (
            <img
              className='mx-auto w-9'
              style={{
                filter:
                  'invert(92%) sepia(4%) saturate(14%) hue-rotate(359deg) brightness(116%) contrast(72%)',
              }}
              src={props.img}
            />
          )}
        </div>
      ) : null}
      {props.children}
    </label>
  );
};

export default Label;
