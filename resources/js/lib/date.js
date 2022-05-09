import dateFnsFormat from 'date-fns/format'
import dateFnsFormatDistancetoNowStrict from 'date-fns/formatDistanceToNowStrict'

function toDate(time) {
  return time instanceof Date ? time : new Date(time)
}

export function formatDate(time, format) {
  return dateFnsFormat(toDate(time), format)
}

export function formatDistanceToNow(time) {
  return dateFnsFormatDistancetoNowStrict(toDate(time), {
    includeSeconds: false,
    addSuffix: true,
  })
}
