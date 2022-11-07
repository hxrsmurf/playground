import React, { useEffect, useState } from 'react'
import LoginButton from './loginbutton'

export default async function page() {
  //Generate Auth Link
  const query_spotify_url = await fetch('http://localhost:3000/api/login')
  const spotify_url = await query_spotify_url.json()

  return (
    <div className='flex justify-center'>
      <div>
        <LoginButton spotify_url={spotify_url} />
      </div>
    </div>
  )
}
