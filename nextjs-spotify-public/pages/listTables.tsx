import { useEffect, useState } from 'react'

export default function ListTables() {
  const [data, setData]: any = useState()

  useEffect(() => {
    if (data) return

    fetch('/api/dynamodb/listTables')
      .then((res) => res.json())
      .then((data) => {
        setData(data.tables)
      })
  })

  if (!data) return <>Loading...</>

  return (
    <div className='flex justify-center mt-14'>
      <div>
        <div>Hello World</div>
        {data.map((d: any, id: any) => (
          <div className='mt-4' key={id}>
            {d}
          </div>
        ))}
      </div>
    </div>
  )
}
