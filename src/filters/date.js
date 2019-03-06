import moment from 'moment';

export default function (time) {
  const date = moment.unix(time).format('YYYY-MM-DD');
  return date;
}
