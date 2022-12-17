export function top_artists(tracks: any) {
  let play_count: any = {}
  let track_play_count: any = {}
  let track_name: any = {}

  tracks.forEach((element: any) => {
    const song_id = element['songID']['S']
    const song = element['song']['S']
    const album = element['album']['S']
    const artist = element['artist']['S']
    const device = element['device']['S']

    // Previous months may not have possibleDuplicate field
    let repeat = undefined
    if (!('possibleDuplicate' in element)) {
      repeat = false
    } else {
      repeat = element['possibleDuplicate']['BOOL']
    }

    if (!track_name[song_id]) {
      track_name[song_id] = song
    }

    if (!repeat) {
      play_count[artist] = play_count[artist] + 1 || 1
      track_play_count[song_id] = track_play_count[song_id] + 1 || 1
    }
  })

  const artists = Object.fromEntries(
    Object.entries(play_count)
      .sort(([, a]: any, [, b]: any) => b - a)
      .slice(0, 10)
  )

  const trackss = Object.fromEntries(
    Object.entries(track_play_count)
      .sort(([, a]: any, [, b]: any) => b - a)
      .slice(0, 10)
  )

  const output_tracks: any = {}

  Object.entries(trackss).map((track:any , id: any)=>{
    const track_id = track[0]
    const play_count = track[1]
    const name = track_name[track_id]
    output_tracks[name] = play_count
  })

  return { artists, output_tracks }
}
