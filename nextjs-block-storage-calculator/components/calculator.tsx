import { useState } from 'react'

const vendors = [
  { name: 'Backblaze', storage: 0.005, retrieval: 0.01 },
  { name: 'BunnyCDN', storage: 0.01, retrieval: 0.01 },
  { name: 'Cloudflare', storage: 0.015, retrieval: 0 },
  { name: 'DigitalOcean', storage: 0.02, retrieval: 0.01 },
  { name: 'OVH', storage: 0.03, retrieval: 0.011 },
  { name: 'AWS S3 Std.', storage: 0.023, retrieval: 0 },
]

export default function Calculator() {
  const [storage, setStorage]: any = useState(0)

  const handleUpdate = (e: any | number) => {
    setStorage(e.target.value)
    console.log(storage)
  }

  const handleClear = () => {
    setStorage(null)
  }

  return (
    <div>
      <div className='grid grid-flow-col grid-cols-4'>
        <div>Storage (GB)</div>
        <div>
          <input
            id='input'
            type='text'
            value={storage ? storage : ''}
            onChange={(e) => handleUpdate(e)}
          />
        </div>
        <div className='ml-4'>
          <button onClick={() => handleClear()}>Clear</button>
        </div>
      </div>
      <div className='mt-6'>
        <div>
          <div className='grid grid-flow-col mb-4 font-bold text-1xl'>
            <div className='min-w-[100px]'>Vendor</div>
            <div className='min-w-[100px] max-w-[100px]'>Storage Price</div>
            <div className='min-w-[100px] max-w-[100px]'>
              Retrieval/Download
            </div>
            <div className='min-w-[100px] max-w-[100px]'>Total</div>
          </div>
          {vendors.map((vendor, id) => (
            <div key={id} className='grid grid-flow-col mt-4'>
              <div className='min-w-[100px]'>{vendor.name}</div>
              {storage > 0 ? (
                <>
                  <div className='min-w-[100px] max-w-[100px]'>
                    {(vendor.storage * storage).toFixed(2)}
                  </div>
                  <div className='min-w-[100px] max-w-[100px]'>
                    {(vendor.retrieval * storage).toFixed(2)}
                  </div>
                  <div className='min-w-[100px] max-w-[100px]'>
                    {(
                      vendor.retrieval * storage +
                      vendor.storage * storage
                    ).toFixed(2)}
                  </div>
                </>
              ) : (
                <>
                  <div className='min-w-[100px] max-w-[100px]'>
                    {vendor.storage}
                  </div>
                  <div className='min-w-[100px] max-w-[100px]'>
                    {vendor.retrieval}
                  </div>
                  <div className='min-w-[100px] max-w-[100px]'>
                    {(vendor.retrieval + vendor.storage).toFixed(2)}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className='mt-8'>Disclaimer: Estimate only. Not affiliated.</div>
      </div>
    </div>
  )
}
