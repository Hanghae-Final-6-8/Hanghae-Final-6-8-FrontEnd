import { MainYesTasteSurvey } from '../Main';
import { useAppDispatch } from '../../redux/configureStore';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { detailBeans } from '../../redux/modules/beans';

const BeanDetail = () => {
  const appDispatch = useAppDispatch();
  const { pathname } = useLocation();
  const beansNum = Number(pathname.split('/')[2]);

  useEffect(() => {
    appDispatch(detailBeans(beansNum));
  });
  return (
    <>
      <MainYesTasteSurvey />
    </>
  );
};

export default BeanDetail;
