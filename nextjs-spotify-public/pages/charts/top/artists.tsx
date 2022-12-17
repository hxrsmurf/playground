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

export default function ChartArtists(data: any) {
  const labels = Object.keys(data.data)

  // https://stackoverflow.com/questions/31631354/how-to-display-data-values-on-chart-js
  const chart_data = {
    labels,
    datasets: [
      {
        axis: 'x',
        label: 'Play Count',
        data: data.data,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  const options: any = {
    responsive: true,
    animation: {
      delay: 500,
    },
    scales: {
      y: {
        color: 'white',
      },
    },
    plugins: {
      title: {
        display: false,
        text: 'Top 10 Artists',
        color: 'white',
        font: {
          size: 24,
        },
      },
      datalabels: {
        formatter: function (value: any, context: any) {
          const artist_name = context.chart.data.labels[context.dataIndex]
          return data.data[artist_name]
        },
        align: 'top',
        anchor: 'end',
        color: 'white',
      },
    },
  }

  return <Bar options={options} data={chart_data} />
}
