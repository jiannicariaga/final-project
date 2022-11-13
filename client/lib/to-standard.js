export default function toStandard(time) {
  const militaryHour = parseInt(time.slice(0, 2));
  const minutes = time.slice(2);
  const maridiem = militaryHour >= 12 ? 'PM' : 'AM';
  let standardHour;
  if (militaryHour > 0 && militaryHour <= 12) {
    standardHour = militaryHour;
  } else if (militaryHour > 12) {
    standardHour = militaryHour - 12;
  } else if (militaryHour === 0) {
    standardHour = 12;
  }
  return `${standardHour}:${minutes}${maridiem}`;
}
