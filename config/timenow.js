function zeros(num) {
  if (num < 10) {
    return '0'+num
  }
  else {
    return num
  }
}

export function CurrentTime() {
  const locale = new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' })
  let current = new Date(locale)
  let hour = current.getHours()
  let minute = current.getMinutes()
  let year = current.getFullYear()
  let month = current.getMonth()+1
  let day = current.getDate()
  return year + '/' + zeros(month) + '/' + zeros(day) + ' ' + zeros(hour) + ':' + zeros(minute)
}