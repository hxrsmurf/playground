import React, { useEffect, useState } from 'react'
import LoginButton from './loginbutton'

async function getData(){
  const query_spotify_url = await fetch('http://localhost:3000/api/login')
  const spotify_url = await query_spotify_url.json()
  return spotify_url.url
}

export default async function page() {
  //Generate Auth Link

  const spotify_url = await getData()

  return (
    <div className='flex justify-center'>
      <div>
        <LoginButton spotify_url={spotify_url} />
      </div>
    </div>
  )
}
