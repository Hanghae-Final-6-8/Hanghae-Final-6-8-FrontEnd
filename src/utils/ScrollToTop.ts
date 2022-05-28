import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  const domEl = document.getElementsByClassName('infinityScroll');
  const l_docElement = document.documentElement;

  useEffect(() => {
    domEl[0].scrollTo(0, 0);
    l_docElement.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
