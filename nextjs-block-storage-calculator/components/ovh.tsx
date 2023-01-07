import Link from 'next/link'

const pricing_info = [
  {
    name: 'Incoming Public Traffic',
    price: 'Included',
  },
  {
    name: 'Ingoing Internal Traffic',
    price: 'Included',
  },
  {
    name: 'Outgoing Internal Traffic',
    price: 'Included',
  },
  {
    name: 'Outgoing Public Traffic',
    price: '$0.011/GB',
  },
  {
    name: 'Replica Storage (Erasure Coding 6+3)',
    price: '$0.008/month/GB',
  },
]

const pricing_high_performance = [
  {
    name: 'Incoming Public Traffic',
    price: 'Included',
  },
  {
    name: 'Ingoing Internal Traffic',
    price: 'Included',
  },
  {
    name: 'Outgoing Internal Traffic',
    price: 'Included',
  },
  {
    name: 'Outgoing Public Traffic',
    price: '$0.011/GB',
  },
  {
    name: 'Replica Storage (Erasure Coding 6+3)',
    price: '$0.03/month/GB',
  },
]

export default function OVH() {
  return (
    <div>
      <div className='font-bold text-4xl'>
        <Link
          href={
            'https://www.ovhcloud.com/en/public-cloud/prices/#439'
          }
        >
          OVH Object Storage Pricing
        </Link>
      </div>
      <div className='mt-6 font-bold text-2xl'>Standard Object Storage</div>
      <div>
        {pricing_info.map((category, id) => (
          <div key={id} className='grid grid-flow-col mt-4'>
            <div className='min-w-[300px] max-w-[300px]'>{category.name}</div>
            <div className='max-w-[600px]'>
              <div>{category.price}</div>
            </div>
          </div>
        ))}
      </div>

      <div className='mt-12 font-bold text-2xl'>High-Performance Object Storage</div>
      <div>
        {pricing_high_performance.map((category, id) => (
          <div key={id} className='grid grid-flow-col mt-4'>
            <div className='min-w-[300px] max-w-[300px]'>{category.name}</div>
            <div className='max-w-[600px]'>
              <div>{category.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
