import { useEffect } from 'react';
import { share } from '../../assets/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configureStore';

const KakaoShare = () => {
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_MAP_KEY);
    }
  }, []);
  const tasteList = useSelector((state: RootState) => state.taste);
  const { beanImage, beanId, beanName } = tasteList;

  const url = 'https://copick.site';

  //버튼을 누르면 실행되는 함수
  const handleShareKakao = () => {
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: `내가 Pick한 원두는?!\n${beanName}`,
        description: '#카페 #원두 #분위기 #커피',
        imageUrl: beanImage,
        imageWidth: 100,
        imageHeight: 200,
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: '자세히 보기',
          link: {
            mobileWebUrl: `${url}/beans/${beanId}`,
            webUrl: `${url}/beans/${beanId}`,
          },
        },
        {
          title: '나의 원두 취향 테스트하기',
          link: {
            mobileWebUrl: `${url}/survey/main`,
            webUrl: `${url}/survey/main`,
          },
        },
      ],
    });
  };

  return (
    <button
      className='fixed w-12 h-12 rounded-full z-10 bg-brownP bg-cover bg-right bottom-104px right-6 shadow-tasteBrown'
      onClick={handleShareKakao}
    >
      <img
        className='mx-auto '
        src={share}
        style={{
          filter:
            'invert(95%) sepia(0%) saturate(21%) hue-rotate(357deg) brightness(104%) contrast(108%)',
        }}
      />
    </button>
  );
};

export default KakaoShare;
