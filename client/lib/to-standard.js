export default function toStandard(time) {
  if (!time) return 'Closed';
  const militaryHour = parseInt(time.slice(0, 2));
  const standardHour = militaryHour === 12 ? 12 : 12 % militaryHour;
  const minutes = time.slice(2);
  const maridiem = militaryHour < 12 ? 'AM' : 'PM';
  return `${standardHour}:${minutes}${maridiem}`;
}
