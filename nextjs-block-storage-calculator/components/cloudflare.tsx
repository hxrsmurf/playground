import Link from 'next/link'

const pricing_info = [
  {
    name: '',
    free: 'Free',
    paid: 'Paid',
  },
  {
    name: 'Storage',
    free: '10 GB / month',
    paid: '$0.015/GB/Month',
  },
  {
    name: 'Class A Operations',
    free: '1 million requests / month',
    paid: '$4.50 / million requests',
  },
  {
    name: 'Class B Operations',
    free: '10 million requests / month',
    paid: '$0.36 / million requests',
  },
]

const pricing_stream = [
  {
    name: 'Streaming',
    price: '$1 per 1,000 minutes delivered',
  },
  {
    name: 'Storage',
    price: '$5 per 1,000 minutes stored',
  },
]

export default function Cloudflare() {
  return (
    <div>
      <div className='font-bold text-4xl'>Cloudflare Pricing</div>

      <div className='mt-4 font-bold text-2xl'>
        <Link href={'https://developers.cloudflare.com/r2/platform/pricing/'}>
          R2
        </Link>
      </div>
      <div>
        {pricing_info.map((category, id) => (
          <div key={id} className='grid grid-flow-col mt-4'>
            <div className='min-w-[230px] max-w-[230px]'>{category.name}</div>
            <div className='grid grid-flow-col'>
              <div className='min-w-[200px] max-w-[200px]'>{category.free}</div>
              <div className='min-w-[200px] max-w-[200px]'>{category.paid}</div>
            </div>
          </div>
        ))}
      </div>

      <div className='mt-6 font-bold text-2xl'>
        <Link href={'https://www.cloudflare.com/products/cloudflare-stream/'}>Stream</Link>
      </div>
      <div>
        {pricing_stream.map((category, id) => (
          <div key={id} className='grid grid-flow-col mt-4'>
            <div className='min-w-[100px] max-w-[100px]'>{category.name}</div>
            <div>
              <div>{category.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}