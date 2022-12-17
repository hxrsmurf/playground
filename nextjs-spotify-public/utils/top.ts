export function top_artists(tracks: any) {
  let play_count: any = {}

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

    if (!repeat) {
      play_count[artist] = play_count[artist] + 1 || 1
    }
  })

  const artists = Object.fromEntries(
    Object.entries(play_count)
      .sort(([, a]: any, [, b]: any) => b - a)
      .slice(0, 10)
  )

  return artists
}
