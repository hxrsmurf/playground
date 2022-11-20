{
  /* https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript */
}
export function millisToMinutesAndSeconds(millis: any) {
  var minutes = Math.floor(millis / 60000)
  var seconds: any = ((millis % 60000) / 1000).toFixed(0)
  return seconds == 60
    ? minutes + 1 + ':00'
    : minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}
