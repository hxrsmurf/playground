export function available_dates() {
  const year = 2023
  const month = new Date().getMonth() + 1
  var start: number = 0

  const months: any = []

  while (start < month) {
    start = start + 1
    let start_string = String(start)
    if (start_string.length < 2) start_string = '0' + start_string
    let final_string = year + start_string
    months.push(year + '-' + start_string)
  }

  // Obviously not a great way to do it. But it's a good workaround for now.
  var last_year: number = 0

  while (last_year < 12) {
    last_year = last_year + 1
    let last_year_append = String(last_year)
    if (last_year_append.length < 2) last_year_append = '0' + last_year_append
    months.push('2022' + '-' + last_year_append)
  }

  return {year, months}
}