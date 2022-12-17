import { redis } from '../../lib/database'

export async function redis_update_tracks(year_month: string, tracks: any) {
  const client = redis()
  client.connect()
  try {
    return client
      .set(year_month, JSON.stringify(tracks))
      .then(() => {
        return true
      })
      .catch((error) => {
        return error
      })
  } catch (error) {
    return error
  }
}
