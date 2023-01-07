import Link from 'next/link'

const pricing_info = [
  {
    name: 'Storage',
    price: '250 GiB',
  },
  {
    name: 'Outbound Transfer',
    price: '1 TiB',
  },
  {
    name: 'Additional Storage',
    price: '$0.02/GiB',
  },
  {
    name: 'Additional Transfer',
    price: '$0.01/GiB',
  },
]

export default function DigitalOcean() {
  return (
    <div>
      <div className='font-bold text-4xl'>
        <Link
          href={
            'https://www.digitalocean.com/pricing/spaces-object-storage'
          }
        >
          DigitalOcean Spaces Pricing
        </Link>
      </div>
      <div className='mt-6 font-bold text-2xl'>$5 per month</div>
      <div>
        {pricing_info.map((category, id) => (
          <div key={id} className='grid grid-flow-col mt-4'>
            <div className='min-w-[200px] max-w-[200px]'>{category.name}</div>
            <div className='max-w-[600px]'>
              <div>{category.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
