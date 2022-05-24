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
ChartJS.defaults.font.size = 14;

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
  const options = {
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 3,
        ticks: {
          stepSize: 1,
        },
        pointLabels: {
          font: {
            size: 14,
            family: 'sans',
          },
        },
      },
    },
  };

  return (
    <div>
      <Radar data={data} options={options} />
    </div>
  );
};

export default Chart;
