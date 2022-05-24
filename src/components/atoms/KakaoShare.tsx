import { useEffect } from 'react';
import { share } from '../../assets/icons';

const url = 'url 입력';

const KakaoShare = () => {
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_MAP_KEY);
    }
  }, []);

  //버튼을 누르면 실행되는 함수
  const shareKakao = () => {
    //이부분이 매우 헷갈림 여러 사이트를 참고했는데 이 sendDefault부분을 잘 봐야한다.
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '나에게 맞는 원두는?',
        description: '#카페 #원두 #분위기 #커피',
        imageUrl:
          'https://p1.pxfuel.com/preview/574/961/108/coffee-beans-roasted-brown-caffeine.jpg',
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
        {
          title: '앱으로 보기',
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  };

  return (
    <div>
      <div className='share-node cursor-pointer' onClick={shareKakao}>
        <img src={share} alt='카카오공유' />
      </div>
    </div>
  );
};

export default KakaoShare;
