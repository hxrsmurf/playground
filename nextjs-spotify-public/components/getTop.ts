export function getTopTracks(data: any) {
  let tracks: any = {}
  let tracks_play_count: any = {}

  data.forEach((element: any) => {
    const song_id = element['songID']['S']
    const song = element['song']['S']
    const album = element['album']['S']
    const artist = element['artist']['S']
    const device = element['device']['S']
    const repeat = element['possibleDuplicate']['BOOL']

    if (!repeat) {
      // Force 1 if NaN/undefined
      tracks_play_count[song_id] = tracks_play_count[song_id] + 1 || 1
      tracks[song_id] = { song, artist, album, device }
    }
  })

  const sorted = Object.fromEntries(
    Object.entries(tracks_play_count)
      .sort(([, a]: any, [, b]: any) => b - a)
      .slice(0, 10)
  )

  const result = Object.entries(sorted).map((id: any) => {
    const track_info = tracks[id[0]]
    return { ...track_info, count: id[1] }
  })

  const top: any = {}

  result.forEach((element: any) => {
    top[element.song] = element.count
  })

  return { sorted, tracks, result, top }
}
