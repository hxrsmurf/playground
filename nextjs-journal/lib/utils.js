import moment from 'moment'

export function todayPage() {
  const today = new Date().toISOString().slice(0, 10)
  const year = today.split('-')[0]
  const month = today.split('-')[1]
  const day = today.split('-')[2]
  const weekday_name = moment().format('dddd')
  const today_page = year + '/' + month + '/' + day
  return {
    year: year,
    month: month,
    day: day,
    today_page: today_page,
    weekday: weekday_name,
  }
}
