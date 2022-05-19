import classnames from 'classnames';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

interface ChartProps {
  children?: React.ReactNode;
  beansData: Array<number>;
}

const Chart = (props: ChartProps) => {
  const data = {
    labels: ['산미', '단 맛', '고소한 맛', '바디감', '쓴 맛'],
    datasets: [
      {
        data: props.beansData,
        backgroundColor: 'rgba(109,73,55,0.7)',
        borderColor: '#6D4937',
        borderWidth: 1,
      },
    ],
  };

  console.log(data.datasets[0].data);

  return (
    <div>
      <Radar data={data} />
    </div>
  );
};

export default Chart;
