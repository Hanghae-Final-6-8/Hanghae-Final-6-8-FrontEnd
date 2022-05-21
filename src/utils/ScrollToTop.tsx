import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  const domEl = document.getElementsByClassName('infinityScroll');

  useEffect(() => {
    domEl[0].scrollTo(0, 0);
  }, [pathname]);

  return null;
}
