import { MainYesTasteSurvey } from '../Main';
import { useAppDispatch } from '../../redux/configureStore';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { detailBeans } from '../../redux/modules/beans';
import { NotFound } from '../System';

const BeanDetail = () => {
  const appDispatch = useAppDispatch();
  const { pathname } = useLocation();
  const beansNum = Number(pathname.split('/')[2]);

  console.log(typeof beansNum);

  useEffect(() => {
    appDispatch(detailBeans(beansNum));
  });
  return (
    <>{isNaN(beansNum) || beansNum ? <NotFound /> : <MainYesTasteSurvey />}</>
  );
};

export default BeanDetail;
