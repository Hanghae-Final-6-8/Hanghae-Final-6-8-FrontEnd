import React, { useCallback, useEffect } from 'react';
import _ from 'lodash';
import { isMobile } from 'react-device-detect';

interface LayoutProps {
  children: React.ReactNode;
  callNext: () => void;
  loading: boolean;
  isNext: boolean;
}

const domEl = document.getElementsByClassName('infinityScroll');
const l_docElement = document.documentElement;

const InfinityScroll: React.FC<LayoutProps> = (props) => {
  const { callNext, isNext, loading } = props;

  const _handleScroll = _.throttle(() => {
    if (loading) {
      return;
    }

    const { clientHeight } = domEl[0];
    const { scrollHeight } = domEl[0];

    const scrollTop = domEl[0].scrollTop;

    if (isMobile) {
      if (
        l_docElement.scrollHeight -
          l_docElement.clientHeight -
          l_docElement.scrollTop <
        200
      ) {
        callNext();
      }
    } else {
      if (scrollHeight - clientHeight - scrollTop < 200) {
        callNext();
      }
    }

    // if (
    //   scrollHeight - clientHeight - scrollTop < 200 ||
    //   l_docElement.scrollHeight -
    //     l_docElement.clientHeight -
    //     l_docElement.scrollTop <
    //     200
    // ) {
    //   // console.log('!callNext!');
    //   callNext();
    // }
  }, 300);

  const handleScroll = useCallback(_handleScroll, [loading]);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (isNext) {
      domEl[0].addEventListener('scroll', handleScroll);
      l_docElement.addEventListener('touchmove', handleScroll);
    } else {
      domEl[0].removeEventListener('scroll', handleScroll);
      l_docElement.removeEventListener('touchmove', handleScroll);
    }

    return () => {
      domEl[0].removeEventListener('scroll', handleScroll);
      l_docElement.removeEventListener('touchmove', handleScroll);
    };
  }, [isNext, loading]);

  return <>{props.children}</>;
};

export default InfinityScroll;

InfinityScroll.defaultProps = {
  children: null,
  loading: false,
  isNext: false,
};
