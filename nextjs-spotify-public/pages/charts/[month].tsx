import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
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

export default function page() {
  const router = useRouter()
  const { month } = router.query
  const [data, setData]: any = useState()
  const [artists, setArtists]: any = useState()
  const [tracks, setTracks]: any = useState()

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
        display: true,
        text: 'Top 10 Artists for ' + month,
        color: 'white',
        font: {
          size: 24,
        },
      },
      datalabels: {
        formatter: function (value: any, context: any) {
          const artist_name = context.chart.data.labels[context.dataIndex]
          return artists[artist_name]
        },
        align: 'top',
        anchor: 'end',
        color: 'white',
      },
    },
  }

  const track_options: any = {
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
        display: true,
        text: 'Top 10 Tracks for ' + month,
        color: 'white',
        font: {
          size: 24,
        },
      },
      datalabels: {
        formatter: function (value: any, context: any) {
          const track_name = context.chart.data.labels[context.dataIndex]
          return tracks[track_name]
        },
        align: 'top',
        anchor: 'end',
        color: 'white',
      },
    },
  }

  useEffect(() => {
    if (data) return

    fetch('/api/dynamodb/listTracks')
      .then((res) => res.json())
      .then((data) => {
        setData(data.data)
        setArtists(data.sorted_top_artists)
        setTracks(data.top_tracks.top)
      })
  })

  if (!data) return <>Loading...</>
  if (!artists) return <>Loading...</>
  if (!tracks) return <>Loading...</>

  const artist_labels = Object.keys(artists)

  // https://stackoverflow.com/questions/31631354/how-to-display-data-values-on-chart-js
  const chart_data = {
    artist_labels,
    datasets: [
      {
        axis: 'x',
        label: 'Play Count',
        data: artists,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  const track_labels = Object.keys(tracks)

  const track_data = {
    track_labels,
    datasets: [
      {
        label: 'Play Count',
        data: tracks,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  return (
    <div className='flex justify-center mt-14'>
      <div className='min-w-[1200px] min-h-full mt-24'>
        <div className='mb-14'>
          <Bar options={options} data={chart_data} />
        </div>
        <div>
          <Bar options={track_options} data={track_data} />
        </div>
      </div>
    </div>
  )
}
