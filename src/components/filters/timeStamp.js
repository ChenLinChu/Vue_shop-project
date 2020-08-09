export default function(date) {
  const newDate = new Date(date * 1000);

  return `${(newDate.getDate() < 10 ? '0' : '') +
    newDate.getDate()}-${(newDate.getMonth() < 10 ? '0' : '') +
    (newDate.getMonth() + 1)}-${newDate.getFullYear() - 2000}`;
}
