import { naver } from '../../assets/icons';

const LoginBtnNaver = () => {
  const handleNotReadyToLogin = () => {
    alert(
      '네이버, 구글 로그인은 구현 중 입니다.\n(사이트 완성 후 검수를 받아야 합니다)'
    );
  };
  return (
    <button
      className='w-50px h-50px  mr-7 rounded-full bg-white shadow-loginBtn'
      onClick={handleNotReadyToLogin}
    >
      <img className='mx-auto' src={naver} />
    </button>
  );
};

export default LoginBtnNaver;
