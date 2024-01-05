export const dateToGB = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-GB', options);
  return formattedDate;
}
