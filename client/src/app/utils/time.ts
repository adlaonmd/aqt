export function convertTime12to24(time12h: String) {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier.toUpperCase() === 'PM') {
    hours = (parseInt(hours, 10) + 12).toString();
  }

  return parseInt(hours);
}
