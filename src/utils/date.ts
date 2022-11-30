import moment from "moment";

export const formatDate = (date: Date | undefined) => {
  return moment(date).format("MMM Do YYYY");
};
