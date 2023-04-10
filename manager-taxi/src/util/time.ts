export const getCurrDay = () => {
  const closingTime = 12;

  let targetDate = new Date();

  let hour = targetDate.getHours();

  // shift will close automaticaly after 1 AM

  if (hour < closingTime) {
    targetDate = new Date(targetDate.getTime());
    targetDate.setDate(targetDate.getDate() - 1);
  }

  let yyyy = targetDate.getFullYear();
  let mm = targetDate.getMonth() + 1; // Months start at 0!
  let dd = targetDate.getDate();

  const formattedToday = dd + "/" + mm + "/" + yyyy + " 02:00";
  return formattedToday;
};
