export async function getPlaylists(access_token: string) {
  const req = await fetch(process.env.API_URL + '/api/spotify/playlists', {
    method: 'GET',
    headers: {
      Authorization: access_token,
      'Content-Type': 'application/json',
    },
  })
  return req.json()
}