import { LoginBtnKakao, LoginBtnNaver, LoginBtnGoogle } from '../molecules';
import { Hr } from '../atoms';

interface LoginBtnGroupProps {
  className?: string;
}

const LoginBtnGroup = (props: LoginBtnGroupProps) => {
  const className = props.className;

  return (
    <>
      <p className={`text-body text-gray60 ${className}`}>
        간편 회원가입/로그인
      </p>
      <Hr type='main100' />
      <div className='mt-2.5'>
        <LoginBtnKakao />
        <LoginBtnNaver />
        <LoginBtnGoogle />
      </div>
    </>
  );
};

export default LoginBtnGroup;
