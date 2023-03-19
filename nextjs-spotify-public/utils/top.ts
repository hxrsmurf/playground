import { stringify } from 'querystring'

export function top_artists(tracks: any) {
  let play_count: any = {}
  let track_play_count: any = {}
  let track_name: any = {}
  let device_play_count: any = {}
  let playlist_play_count: any = {}

  tracks.forEach((element: any) => {
    const song_id = element['songID']['S']
    const song = element['song']['S']
    const artist = element['artist']['S']

    // Previous months may not have some fields
    let album = null

    if ('album' in element) {
      album = element['album']['S']
    }

    let playlist = null
    if ('playlist_name' in element) {
      playlist = element['playlist_name']['S']
      if (playlist == 'none') playlist = "Other"
    }

    let device = null
    if ('device' in element) {
      device = element['device']['S']
    }

    let repeat = null
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

      if (device) {
        device_play_count[device] = device_play_count[device] + 1 || 1
      }

      if (playlist) {
        playlist_play_count[playlist] = playlist_play_count[playlist] + 1 || 1
      }
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

  Object.entries(trackss).map((track: any, id: any) => {
    const track_id = track[0]
    const play_count = track[1]
    const name = track_name[track_id]
    output_tracks[name] = play_count
  })

  // Device Play Count

  const devicess = Object.fromEntries(
    Object.entries(device_play_count)
      .sort(([, a]: any, [, b]: any) => b - a)
      .slice(0, 4)
  )

  const output_devices: any = {}

  Object.entries(devicess).map((device: any) => {
    let new_device_name = String(device[0]).trim()

    if (new_device_name == process.env.DEVICE_DESKTOP) {
      new_device_name = 'Desktop'
    } else if (new_device_name == process.env.DEVICE_LAPTOP) {
      new_device_name = 'Laptop'
    } else if (new_device_name == process.env.DEVICE_SAMSUNG) {
      new_device_name = 'Samsung'
    } else if (new_device_name == process.env.DEVICE_PIXEL) {
      new_device_name = 'Pixel'
    } else if (new_device_name == process.env.DEVICE_TABLET) {
      new_device_name = 'Tablet'
    }

    output_devices[new_device_name] = device[1]
  })

  const output_playlist = Object.fromEntries(
    Object.entries(playlist_play_count)
      .sort(([, a]: any, [, b]: any) => b - a)
      .slice(0, 5)
  )

  return { artists, output_tracks, output_devices, output_playlist }
}
