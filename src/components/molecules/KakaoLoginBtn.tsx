import { kakao } from '../../assets/icons';

interface OnClick {
  onClick: () => void;
}

const KakaoLoginBtn = (props: OnClick) => {
  return (
    <>
      <button
        className='w-50px h-50px mr-7 rounded-full bg-white shadow-loginBtn'
        onClick={props.onClick}
      >
        <img className='mx-auto' src={kakao} />
      </button>
    </>
  );
};

export default KakaoLoginBtn;
