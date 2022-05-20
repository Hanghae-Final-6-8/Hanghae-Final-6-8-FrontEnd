import { login } from '../../assets/icons';
import { Text, Span, Button, GridBox } from '../../components/atoms';
import { useNavigate } from 'react-router-dom';
import { LoginBtnGroup } from '../../components/organisms';
import { removeLocalStorage } from '../../utils/localstorage';

const TasteSurveyNeedLogin = () => {
  const navigate = useNavigate();

  const handleCloseTasteSurvey = () => {
    removeLocalStorage('surveyResult');
    navigate('../../main');
  };

  return (
    <>
      <GridBox type='flexBasic'>
        <div className='mt-[74px]'>
          <img src={login} />
        </div>
        <Text className='font-500 text-sub mt-5'>테스트의 결과는</Text>
        <Text className='font-500 text-sub'>
          <Span type='strong'>로그인 후</Span> 확인이 가능해요!
        </Text>
        <Text className='text-caption text-gray60 mt-2'>
          아래 간편 회원가입/로그인을 통해
        </Text>
        <Text className='text-caption text-gray60'>
          빠르게 나에게 딱 맞는 원두를 확인해 보세요!
        </Text>
        <div className='flex flex-col text-center'>
          <LoginBtnGroup className='mt-[153px]' />
        </div>
      </GridBox>
      <Button type='tasteSurveyNoneActive' onClick={handleCloseTasteSurvey}>
        결과 보지 않고 닫기
      </Button>
    </>
  );
};

export default TasteSurveyNeedLogin;
