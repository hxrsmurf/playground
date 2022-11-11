export default function viewPasswordModal({ id }: any) {
  return (
    <>
      <div className='grid-flow-row'>
        <div className='grid-cols-2 grid max-w-[600px]'>
          {Object.keys(id).map((key) => (
            <>
              {key == 'user' || key == 'sk' || key == 'pk' ? (
                <></>
              ) : (
                <>
                  <div className='font-bold'>{key}</div>
                  <div className='ml-14'>{id[key].S}</div>
                </>
              )}
            </>
          ))}
        </div>
      </div>
    </>
  )
}
