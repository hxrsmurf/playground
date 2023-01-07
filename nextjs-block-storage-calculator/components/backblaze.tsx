import Link from 'next/link'

const pricing_info = [
  {
    name: 'Storage',
    price: '$0.005/GB/Month',
    note: 'Data stored with Backblaze is calculated hourly, with no minimum retention requirement, and billed monthly. The first 10 GB of storage is free.',
  },
  {
    name: 'Download',
    price: '$0.01/GB',
    note: 'Charged when you download files. Charged for any portion of a GB. The first 1 GB of data downloaded each day is free. Downloads through our CDN and Compute partners are also free.',
  },
  {
    name: 'Transactions',
    note: 'Class "A" transactions – Free \nClass "B" transactions - $0.004 per 10,000 with 2,500 free per day.\nClass "C" transactions - $0.004 per 1,000 with 2,500 free per day.',
  },
]

export default function Backblaze() {
  return (
    <div>
      <div className='font-bold text-4xl'>
        <Link
          href={
            'https://help.backblaze.com/hc/en-us/articles/360037814594-B2-Pricing'
          }
        >
          Backblaze B2 Pricing
        </Link>
      </div>
      <div>
        {pricing_info.map((category, id) => (
          <div key={id} className='grid grid-flow-col mt-4'>
            <div className='min-w-[100px] max-w-[100px]'>{category.name}</div>
            <div className='max-w-[600px]'>
              <div>{category.price}</div>
              <div>{category.note}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
