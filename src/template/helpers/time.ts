import moment from 'moment';

export function formatDate(dateString: string) {

  let date = moment(dateString)
    .format('MMMM D YYYY')
  // SEE: https://momentjs.com/docs/#/displaying/format/

  return date
}






