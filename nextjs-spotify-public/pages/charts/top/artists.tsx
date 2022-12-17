import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
)

export default function ChartArtists(data: any, year_month: any, type: string) {
  const labels = Object.keys(data.data)

  // https://stackoverflow.com/questions/31631354/how-to-display-data-values-on-chart-js
  const chart_data = {
    labels,
    datasets: [
      {
        axis: 'y',
        label: 'Play Count',
        data: Object.values(data.data).map((key: any) => {
          return key
        }),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  const options: any = {
    responsive: true,
    animation: {
      delay: 300,
    },
    scales: {
      x: {
        color: 'white',
      },
    },
    indexAxis: 'y',
    plugins: {
      title: {
        display: true,
        text: 'Top 10 ' + data.type + ' - ' + data.year_month,
        color: 'white',
        font: {
          size: 24,
        },
      },
      datalabels: {
        color: 'white',
      },
    },
  }

  return <Bar options={options} data={chart_data} />
}
