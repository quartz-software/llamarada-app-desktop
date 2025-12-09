export const formatDate = (dateData?: Date) => {
  if (!dateData) return "";
  const isoDate = new Date(dateData).toISOString()
  let date = isoDate.split("T")[0];
  let dateParts = date.split("-");

  return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
};