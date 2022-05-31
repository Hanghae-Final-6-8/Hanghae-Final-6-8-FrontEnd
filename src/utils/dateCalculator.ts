const dateCalculator = (data: string) => {
  const today = new Date();
  const postedDay = new Date(data);
  let newDate = '';
  let betweenTime = 0;
  betweenTime = Math.floor((today.getTime() - postedDay.getTime()) / 1000 / 60);
  if (betweenTime < 1) {
    newDate = '방금전';
  } else if (betweenTime < 60) {
    newDate = `${betweenTime}분전`;
  } else if (betweenTime >= 60) {
    betweenTime = Math.floor(betweenTime / 60);
    if (betweenTime < 24) {
      newDate = `${betweenTime}시간전`;
    } else if (betweenTime >= 24 && betweenTime < 8760) {
      betweenTime = Math.floor(betweenTime / 24);
      newDate = `${betweenTime}일전`;
    } else if (betweenTime >= 8760) {
      betweenTime = Math.floor(betweenTime / 8760);
      newDate = `${betweenTime}년전`;
    }
  }

  return newDate;
};

export default dateCalculator;
