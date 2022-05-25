import { GridBox, Text, Span, Button } from '../../components/atoms';
import { err } from '../../assets/images';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleToMain = () => {
    navigate('/main');
  };

  return (
    <>
      <GridBox type='flexBasic' className='text-center'>
        <Text className='text-head font-500 pt-36'>
          잘못된 <span className='text-red60'>접근</span>입니다
        </Text>
        <div className='mt-50px'>
          <img
            className='relative left-8 mx-auto'
            src={err}
            alt='오류 입니다'
          />
        </div>
        <Text>
          <Span type='strong'>URL</Span>을
        </Text>
        <Text>확인해주세요.</Text>
        <Button
          className='bg-brownS02 mt-7 w-40 mx-auto'
          onClick={handleToMain}
        >
          메인으로
        </Button>
      </GridBox>
    </>
  );
};

export default NotFound;
