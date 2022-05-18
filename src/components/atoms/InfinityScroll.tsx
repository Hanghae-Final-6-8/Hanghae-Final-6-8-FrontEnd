import React, { useCallback, useEffect } from 'react';
import _ from 'lodash';

interface LayoutProps {
  children: React.ReactNode;
  callNext: () => void;
  loading: boolean;
  isNext: boolean;
}

const domEl = document.getElementsByClassName('infinityScroll');
console.log(domEl);
const InfinityScroll: React.FC<LayoutProps> = (props) => {
  const { callNext, isNext, loading } = props;

  const _handleScroll = _.throttle(() => {
    if (loading) {
      return;
    }

    const { clientHeight } = domEl[0];
    const { scrollHeight } = domEl[0];

    const scrollTop = domEl[0].scrollTop;

    if (scrollHeight - clientHeight - scrollTop < 200) {
      console.log('!callNext!');
      callNext();
    }
  }, 300);

  const handleScroll = useCallback(_handleScroll, [loading]);

  useEffect(() => {
    if (loading) {
      return;
    }
    console.log(isNext);
    if (isNext) {
      domEl[0].addEventListener('scroll', handleScroll);
    } else {
      domEl[0].removeEventListener('scroll', handleScroll);
    }

    return () => domEl[0].removeEventListener('scroll', handleScroll);
  }, [isNext, loading]);

  return <>{props.children}</>;
};

export default InfinityScroll;

InfinityScroll.defaultProps = {
  children: null,
  loading: false,
  isNext: false,
};
