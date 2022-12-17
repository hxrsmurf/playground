export default function Home() {
  return (
    <div className='flex justify-center mt-14'>
      <div>Hello World</div>
    </div>
  )
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: process.env.LATEST_MONTH,
    },
  }
}