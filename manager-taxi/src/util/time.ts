export const getCurrDay = () => {
  const closingTime = 12;

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  let hour = today.getHours();

  // shift will close automaticaly after 1 AM

  if (hour < closingTime) {
    dd--;
  }

  const formattedToday = yyyy + "/" + mm + "/" + dd + " 02:00";
  return formattedToday;
};
