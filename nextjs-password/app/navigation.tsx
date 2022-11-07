import Link from 'next/link'

export default function navigation() {
  const menu_items = [
    { name: 'Dashboard', url: '/' },
    { name: 'Settings', url: '/settings' },
  ]

  return (
    <div className='flex justify-center'>
      <div className='flex flex-row mt-8 space-x-8'>
        {menu_items.map((item) => (
          <div key={item.name}>
            <Link href={item.url}>{item.name}</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
