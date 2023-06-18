export function todayPage(){
  const today = new Date().toISOString().slice(0, 10)
  const year = today.split('-')[0]
  const month = today.split('-')[1]
  const day = today.split('-')[2]
  const today_page = year + '/' + month + '/' + day
  return today_page
}