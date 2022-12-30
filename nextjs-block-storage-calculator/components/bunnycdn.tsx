import Link from 'next/link'

const pricing_info = [
  {
    name: 'Single Region',
    price: '$0.01/GB',
  },
  {
    name: 'Two Regions',
    price: '$0.02/GB',
  },
  {
    name: 'Three Regions',
    price: '$0.025/GB',
  },
  {
    name: 'Each Additional Region',
    price: '+$0.005/GB',
  },
]

const pricing_cdn = [
  {
    name: 'Europe & North America',
    price: '$0.01/GB',
  },
  {
    name: 'Asia & Oceania',
    price: '$0.03/GB',
  },
  {
    name: 'South America',
    price: '$0.045/GB',
  },
  {
    name: 'Middle East & Africa',
    price: '$0.06/GB',
  },
]

const pricing_stream = [
  {
    name: 'Encoding',
    price: 'Free',
  },
  {
    name: 'Transcoding',
    price: 'Free',
  },
  {
    name: 'Storage',
    price: 'From $0.01/GB',
  },
  {
    name: 'CDN',
    price: 'From $0.005/GB',
  },
]

export default function BunnyCDN() {
  return (
    <div>
      <div className='font-bold text-4xl'>
        <Link href={'https://bunny.net/pricing/'}>Bunny CDN Pricing</Link>
      </div>

      <div className='mt-4 font-bold text-2xl'>Storage</div>
      <div>
        {pricing_info.map((category, id) => (
          <div key={id} className='grid grid-flow-col mt-4'>
            <div className='min-w-[200px] max-w-[200px]'>{category.name}</div>
            <div className='min-w-[200px] max-w-[200px] flex justify-center'>
              <div>{category.price}</div>
            </div>
          </div>
        ))}
      </div>

      <div className='mt-6 font-bold text-2xl'>CDN</div>
      <div>
        {pricing_cdn.map((category, id) => (
          <div key={id} className='grid grid-flow-col mt-4'>
            <div className='min-w-[200px] max-w-[200px]'>{category.name}</div>
            <div className='min-w-[200px] max-w-[200px] flex justify-center'>
              <div>{category.price}</div>
            </div>
          </div>
        ))}
      </div>

      <div className='mt-6 font-bold text-2xl'>Stream</div>
      <div>
        {pricing_stream.map((category, id) => (
          <div key={id} className='grid grid-flow-col mt-4'>
            <div className='min-w-[200px] max-w-[200px]'>{category.name}</div>
            <div className='min-w-[200px] max-w-[200px] flex justify-center'>
              <div>{category.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}