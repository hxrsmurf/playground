import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

import 'chart.js/auto'
import { Bar, Pie } from 'react-chartjs-2'

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
  let labels = null

  if (data.data) {
    labels = Object.keys(data.data)
  } else {
    return <></>
  }

  const data_type = data.type
  let color_data_labels = 'white'
  let background_color_data_labels: any = 'rgba(255, 99, 132, 0.5)'

  if (data_type == 'Devices') {
    color_data_labels = 'black'
    background_color_data_labels = null
  }

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
        backgroundColor: background_color_data_labels,
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
        color: color_data_labels,
      },
    },
  }

  if (data.type == 'Devices') {
    return <Pie options={options} data={chart_data} />
  }

  return <Bar options={options} data={chart_data} />
}
