import Link from 'next/link'
import Loginnav from './loginnav'

export default function navigation() {
  const menu_items = [
    { name: 'Home', url: '/' },
    { name: 'Login', url: '/login' },
  ]
  return (
    <div className='flex justify-center text-4xl sticky top-0 bg-black'>
      <div className='flex flex-row mt-8 mb-6 space-x-8'>
        {menu_items.map((item) => (
          <>
            <div key={item.name}>
              {!(item.name == 'Login') ? (
                <>
                  <Link href={item.url} className='hover:text-gray-400'>
                    {item.name}
                  </Link>
                </>
              ) : (
                <>
                <Loginnav item={item} />
                </>
              )}
            </div>
          </>
        ))}
      </div>
    </div>
  )
}
