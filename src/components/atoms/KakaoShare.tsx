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
  const { beanImage, beanId, beanName, type } = tasteList;

  const coffType = type === 1 ? '[싱글 오리진]' : '[블렌드]';

  const url = 'https://copick.site';

  //버튼을 누르면 실행되는 함수
  const handleShareKakao = () => {
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: `111개의 원두 중 내가 Pick한 원두 취향은?`,
        description: `진한 맛과 향의 \n'${coffType} ${beanName}☕'`,
        imageUrl:
          'https://velog.velcdn.com/images/leejuhwan/post/8b6068de-0b93-410a-90c1-ea41802dd012/image.png',
        imageWidth: 450,
        imageHeight: 450,
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
          title: '나의 원두취향\n  테스트하기',
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
