import classnames from 'classnames';

interface Text {
  children: React.ReactNode;
  className?: string;
  fw?: string;
  fs?: string;
  fc?: string;
  type?: string;
  mt?: string;
}

const Text = (props: Text) => {
  const fw400 = props.fw === '400';
  const fw500 = props.fw === '500';
  const fw700 = props.fw === '700';

  const fsHead = props.fs === 'head';
  const fsSub = props.fs === 'sub';
  const fsSub2 = props.fs === 'sub2';
  const fsBody = props.fs === 'body';
  const fsCaption = props.fs === 'caption';
  const fsSubH33 = props.fs === 'subH33';

  const fcGray90 = props.fc === 'gray90';
  const fcGray80 = props.fc === 'gray80';
  const fcGray60 = props.fc === 'gray60';
  const fcGray30 = props.fc === 'gray30';
  const fcGray20 = props.fc === 'gray20';
  const fcRed60 = props.fc === 'red60';
  const fcBrownS02 = props.fc === 'brownS02';
  const fcBrownS03 = props.fc === 'brownS03';
  const fcWhite = props.fc === 'white';

  const mt8px = props.mt === '8px';
  const mt84px = props.mt === '84px';

  const tasteNumber = props.type === 'tasteNumber';

  return (
    <p
      className={classnames(
        '',
        { 'text-gray90': props.fc || props.type === undefined },
        { 'font-400': fw400 },
        { 'font-500': fw500 },
        { 'font-700': fw700 },
        { 'text-head': fsHead },
        { 'text-sub': fsSub },
        { 'text-sub2': fsSub2 },
        { 'text-body': fsBody },
        { 'text-caption': fsCaption },
        { 'text-subH33': fsSubH33 },
        { 'text-gray90': fcGray90 },
        { 'text-gray80': fcGray80 },
        { 'text-gray60': fcGray60 },
        { 'text-gray30': fcGray30 },
        { 'text-gray20': fcGray20 },
        { 'text-red60': fcRed60 },
        { 'text-brownS02': fcBrownS02 },
        { 'text-brownS03': fcBrownS03 },
        { 'text-white': fcWhite },
        { 'mt-2': mt8px },
        { 'mt-84px': mt84px },
        { 'mt-84px font-700 text-sub text-gray60': tasteNumber }
      )}
    >
      {props.children}
    </p>
  );
};

export default Text;
