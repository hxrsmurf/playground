import Link from 'next/link'

const standard = [
  {
    description: 'First 50 TB / month',
    price: '$0.023 per GB',
  },
  {
    description: 'Next 450 TB / month',
    price: '$0.022 per GB',
  },
  {
    description: 'Over 500 TB / month',
    price: '$0.021 per GB',
  },
]

const glacier = [
  {
    name: '',
    price: 'Price',
    retrieval: 'Retrieval'
  },
  {
    name: 'S3 Standard - Infrequent Access',
    price: '$0.0125 per GB',
    retrieval: '$0.01',
  },
  {
    name: 'S3 One-Zone - Infrequent Access',
    price: '$0.01 per GB',
    retrieval: '$0.01',
  },
  {
    name: 'S3 Glacier Instant Retrieval',
    price: '$0.004 per GB',
    retrieval: '$0.03',
  },
  {
    name: 'S3 Glacier Flexible Retrieval',
    price: '$0.0036 per GB',
    retrieval: '$0.03',
  },
  {
    name: 'S3 Glacier Deep Archive',
    price: '$0.00099 per GB',
    retrieval: '$0.02',
  },
]

export default function AWS() {
  return (
    <div>
      <div className='font-bold text-4xl'>
        <Link href={'https://aws.amazon.com/s3/pricing/'}>AWS S3 Pricing</Link>
      </div>
      <div className='mt-6'>Note: Estimated Pricing</div>
      <div className='mt-6 font-bold text-2xl'>Standard</div>
      <div>
        {standard.map((category, id) => (
          <div key={id} className='grid grid-flow-col mt-4'>
            <div className='min-w-[230px] max-w-[230px]'>
              {category.description}
            </div>
            <div>
              <div>{category.price}</div>
            </div>
          </div>
        ))}
      </div>
      <div className='mt-6 font-bold text-2xl'>Glacier</div>
      <div>
        {glacier.map((category, id) => (
          <div key={id} className='grid grid-flow-col mt-4'>
            <div className='min-w-[250px] max-w-[250px]'>{category.name}</div>
            <div className='max-w-[600px] grid grid-flow-col'>
              <div className='min-w-[230px] max-w-[230px]'>{category.price}</div>
              <div className='min-w-[230px] max-w-[230px]'>{category.retrieval}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}