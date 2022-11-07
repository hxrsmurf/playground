import Link from 'next/link'

export default function navigation() {
  const menu_items = [
    { name: 'Dashboard', url: '/' },
    { name: 'Login', url: '/login' },
  ]

  return (
    <div className='flex justify-center text-4xl sticky top-0 bg-black'>
      <div className='flex flex-row mt-8 mb-6 space-x-8'>
        {menu_items.map((item) => (
          <div key={item.name}>
            <Link href={item.url}>{item.name}</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
