export default function features() {
  const features = [
    {
      name: 'Client-Side Encryption',
      description: 'CryptoJS',
    },
    {
      name: 'Frontend',
      description: 'NextJS',
    },
    {
      name: 'Database',
      description: 'AWS DynamoDB',
    },
    {
      name: 'Authentication',
      description: 'NextAuth',
    },
  ]
  return (
    <div className='bg-blue-600 text-white'>
      <div className='text-3xl flex justify-center py-24'>
        <div className='grid grid-cols-1 place-content-center space-y-12'>
          <div className='text-center font-bold'>Features</div>
          <div className='grid grid-flow-col grid-cols-4 text-center'>
            {features.map((feature) => (
              <div key={feature.name} className="mx-5">
                <div className="underline underline-offset-8">{feature.name}</div>
                <div className="mt-8">{feature.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
